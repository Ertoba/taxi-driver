// ignore_for_file: unnecessary_string_interpolations

import 'dart:collection';
import 'dart:convert';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:onesignal_flutter/onesignal_flutter.dart';
import '../../services/config.dart';
import '../../services/data_store.dart';
import '../../services/http.dart';
import '../../utils/common_widget.dart';
import '../workspace.dart';

late AndroidNotificationChannel channel;
bool isFlutterLocalNotificationsInitialized = false;
late FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;
bool isOneSignalListenerAdded = false;
final Set<String> processedNotificationIds = HashSet<String>();

bool markNotificationAsProcessed(String? notificationId) {
  if (notificationId == null) return false;
  if (processedNotificationIds.contains(notificationId)) {
    return false;
  }
  processedNotificationIds.add(notificationId);
  return true;
}

Future<void> setupFlutterNotifications() async {
  if (isFlutterLocalNotificationsInitialized) {
    return;
  }
  channel = const AndroidNotificationChannel(
    'high_importance_channel',
    'High Importance Notifications',
    description: 'This channel is used for important notifications.',
    importance: Importance.high,
  );

  flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);
  await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
    alert: true,
    badge: true,
    sound: true,
  );
  isFlutterLocalNotificationsInitialized = true;
}

void showFlutterNotificationfromFirebase(RemoteMessage message) async {
  RemoteNotification? notification = message.notification;
  AndroidNotification? android = message.notification?.android;
  if (notification != null && android != null && !kIsWeb) {
    flutterLocalNotificationsPlugin.show(
      notification.hashCode,
      notification.title,
      notification.body,
      NotificationDetails(
        android: AndroidNotificationDetails(
          channel.id,
          channel.name,
          channelDescription: channel.description,
          icon: 'launch_background',
        ),
      ),
    );
  }
}

Future<void> showOneSignalNotification(OSNotification notification) async {
  final AndroidNotificationDetails androidPlatformChannelSpecifics =
      AndroidNotificationDetails(
    channel.id,
    channel.name,
    channelDescription: channel.description,
    importance: Importance.max,
    priority: Priority.high,
    icon: 'launch_background',
  );

  const DarwinNotificationDetails iOSPlatformChannelSpecifics =
      DarwinNotificationDetails(
    presentAlert: true,
    presentBadge: true,
    presentSound: true,
  );

  final NotificationDetails platformChannelSpecifics = NotificationDetails(
    android: androidPlatformChannelSpecifics,
    iOS: iOSPlatformChannelSpecifics,
  );

  String payloadData = jsonEncode({
    'route': 'desired_route',
    'data': notification.additionalData,
  });

  try {
    await flutterLocalNotificationsPlugin.show(
      notification.hashCode,
      notification.title,
      notification.body,
      platformChannelSpecifics,
      payload: payloadData,
    );
    // ignore: empty_catches
  } catch (e) {}
}

Future<void> setupOneSignal() async {
  OneSignal.initialize(Config.oneSiginalAppid);
  await OneSignal.Notifications.requestPermission(true);
  await getFCMTokenInitialToSetThedata();
  await fetchPlayerId();
}

String? _currentOneSignalExternalId() {
  dynamic userId = loginModel?.data?.id;

  if (userId == null) {
    final storedUserData = box.get('UserData');
    if (storedUserData is String && storedUserData.isNotEmpty) {
      try {
        final decoded = jsonDecode(storedUserData);
        if (decoded is Map) {
          final decodedUser = decoded['data'];
          if (decodedUser is Map) {
            userId = decodedUser['id'];
          }
        }
      } catch (_) {
        return null;
      }
    }
  }

  final normalizedId = userId?.toString().trim() ?? '';
  return normalizedId.isEmpty ? null : 'driver_$normalizedId';
}

Future<void> _identifyOneSignalUserIfAvailable() async {
  final externalId = _currentOneSignalExternalId();
  if (externalId != null) {
    await OneSignal.login(externalId);
  }
}

Future<void> getFCMTokenInitialToSetThedata() async {
  try {
    var fcmToken = await FirebaseMessaging.instance.getToken();
    if (fcmToken != null) {
      await _identifyOneSignalUserIfAvailable();
      await addTagWithKey(fcmToken);
      await fetchPlayerId();
    }
  } catch (error) {
    //
  }
}

Future<void> getFCMToken() async {
  try {
    var fcmToken = await FirebaseMessaging.instance.getToken();
    if (fcmToken != null) {
      await _identifyOneSignalUserIfAvailable();
      await addTagWithKey(fcmToken);
      await fetchPlayerId();

      await httpPost(
        Config.fcmUpdate,
        {"fcm": fcmToken, "player_id": oneSignalPlayerId ?? ""},
        context: navigatorKey.currentContext!,
      );
    }
    // ignore: empty_catches
  } catch (error) {}
}

Future<void> addTagWithKey(String token) async {
  await OneSignal.User.addTagWithKey("FCMToken", token);
}

Future<void> fetchPlayerId() async {
  try {
    oneSignalPlayerId = OneSignal.User.pushSubscription.id;
    oneSignalToken = OneSignal.User.pushSubscription.token;
    oneSignalOptedIn = OneSignal.User.pushSubscription.optedIn;
    if (oneSignalPlayerId != null) {
    } else {}
    // ignore: empty_catches
  } catch (error) {}
}

Future<void> showNotification(context) async {
  FirebaseMessaging.onMessage.listen((RemoteMessage event) async {
    showFlutterNotificationfromFirebase(event);
  });
  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {});
  await setupFlutterNotifications();
  if (!isOneSignalListenerAdded) {
    OneSignal.Notifications.addForegroundWillDisplayListener((event) {
      if (markNotificationAsProcessed(event.notification.notificationId)) {
        showOneSignalNotification(event.notification);
      }
      event.preventDefault();
    });
    isOneSignalListenerAdded = true;
  }

  OneSignal.Notifications.addClickListener((event) {
    if (markNotificationAsProcessed(event.notification.notificationId)) {
      handleNotificationClick(event.notification.additionalData!['route'],
          event.notification.additionalData);
    }
  });
}

void handleNotificationClick(String? route, var data) {
  if (token.isEmpty) {
    showErrorToastMessage("Please Login first");

    return;
  }
  if (route != null) {}
}

Future<void> initializeNotifications() async {
  flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  const AndroidInitializationSettings initializationSettingsAndroid =
      AndroidInitializationSettings('launch_background');

  const DarwinInitializationSettings initializationSettingsDarwin =
      DarwinInitializationSettings(
    requestAlertPermission: true,
    requestBadgePermission: true,
    requestSoundPermission: true,
  );

  const InitializationSettings initializationSettings = InitializationSettings(
    android: initializationSettingsAndroid,
    iOS: initializationSettingsDarwin,
  );

  await flutterLocalNotificationsPlugin.initialize(
    initializationSettings,
    onDidReceiveNotificationResponse:
        (NotificationResponse notificationResponse) async {
      if (notificationResponse.payload != null) {
        try {
          final Map<String, dynamic> data =
              jsonDecode(notificationResponse.payload!);
          handleNotificationClick(data["route"], data);
          // ignore: empty_catches
        } catch (e) {}
      }
    },
  );
}

Map<String, dynamic>? _asStringMap(Object? value) {
  if (value is! Map) return null;

  return value.map(
    (key, mapValue) => MapEntry(key.toString(), mapValue),
  );
}

Future<Map<String, dynamic>?> _loadRideForPickupOtp(String rideId) async {
  for (var attempt = 0; attempt < 3; attempt++) {
    try {
      final snapshot = await FirebaseDatabase.instance
          .ref()
          .child('ride_requests')
          .child(rideId)
          .get();
      final rideData = _asStringMap(snapshot.value);
      final customerData = _asStringMap(rideData?['customer']);
      final otp = (rideData?['OTP'] ?? rideData?['otp'] ?? '')
          .toString()
          .trim();
      final phone = (customerData?['userPhone'] ?? '').toString().trim();

      if (rideData != null && otp.isNotEmpty && phone.isNotEmpty) {
        return rideData;
      }
    } catch (_) {
      // Retry below because the realtime ride may still be synchronizing.
    }

    await Future.delayed(Duration(milliseconds: 500 * (attempt + 1)));
  }

  return null;
}

Future<void> sendRideAcceptedNotification({
  required String subscriptionId,
}) async {
  final context = navigatorKey.currentContext;
  if (context == null) return;

  if (subscriptionId.trim().isNotEmpty) {
    try {
      await httpPost(
        Config.notifyRideAccepted,
        {'subscription_id': subscriptionId},
        context: context,
      );
    } catch (_) {
      debugPrint('Unable to request the ride-accepted notification.');
    }
  }

  final rideId = (box.get('ride_id') ?? '').toString().trim();
  if (rideId.isEmpty) {
    debugPrint('Pickup OTP SMS skipped because the ride ID is unavailable.');
    return;
  }

  try {
    final rideData = await _loadRideForPickupOtp(rideId);
    final customerData = _asStringMap(rideData?['customer']);
    final pickupOtp = (rideData?['OTP'] ?? rideData?['otp'] ?? '')
        .toString()
        .trim();
    final riderPhone = (customerData?['userPhone'] ?? '').toString().trim();
    final riderPhoneCountry =
        (customerData?['userPhoneCountry'] ?? '').toString().trim();
    final riderId = (rideData?['userId'] ?? '').toString().trim();

    if (pickupOtp.isEmpty || riderPhone.isEmpty) {
      debugPrint(
        'Pickup OTP SMS skipped because Firebase ride data is incomplete.',
      );
      return;
    }

    final response = await httpPost(
      Config.sendPickupOtp,
      {
        'ride_id': rideId,
        'rider_id': riderId,
        'rider_phone': riderPhone,
        'rider_phone_country': riderPhoneCountry,
        'pickup_otp': pickupOtp,
      },
      context: context,
    );

    if (response is Map && response['success'] != true) {
      debugPrint('Backend could not send the pickup OTP SMS.');
    }
  } catch (_) {
    debugPrint('Unable to request the pickup OTP SMS.');
  }
}
