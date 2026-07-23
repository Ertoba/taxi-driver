Map<String, dynamic> _stringKeyedMap(Object? value) {
  if (value is! Map) return <String, dynamic>{};

  return value.map(
    (key, mapValue) => MapEntry(key.toString(), mapValue),
  );
}

String _stringValue(Object? value) => value?.toString().trim() ?? '';

class InitialRideRequest {
  final String rideId;
  final String pickupLocation;
  final String dropoffLocation;
  final String userId;
  final Customer customer;
  final ParcalData parcalData;
  final String travelCharges;
  final String status;
  final String travelDistance;
  final String travelTime;
  final String playerId;

  InitialRideRequest({
    required this.rideId,
    required this.pickupLocation,
    required this.dropoffLocation,
    required this.userId,
    required this.customer,
    required this.parcalData,
    required this.travelCharges,
    required this.status,
    required this.travelDistance,
    required this.travelTime,
    required this.playerId,
  });

  factory InitialRideRequest.fromJson(Map<String, dynamic> json) {
    return InitialRideRequest(
      rideId: _stringValue(json['rideId']),
      pickupLocation: _stringValue(json['pickupLocation']),
      dropoffLocation: _stringValue(json['dropoffLocation']),
      userId: _stringValue(json['userId']),
      customer: Customer.fromJson(_stringKeyedMap(json['customer'])),
      parcalData: ParcalData.fromJson(_stringKeyedMap(json['parcelData'])),
      travelCharges: _stringValue(json['travelCharges']),
      status: _stringValue(json['status']),
      travelDistance: _stringValue(json['travelDistance']),
      travelTime: _stringValue(json['travelTime']),
      playerId: _stringValue(json['playerId']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'rideId': rideId,
      'pickupLocation': pickupLocation,
      'dropoffLocation': dropoffLocation,
      'userId': userId,
      'customer': customer.toJson(),
      'travelCharges': travelCharges,
      'status': status,
      'travelDistance': travelDistance,
      'travelTime': travelTime,
      'playerId': playerId,
    };
  }
}

class Customer {
  final String userName;
  final String userPhone;
  final String? userPhoto;
  final String userRating;

  Customer({
    required this.userName,
    required this.userPhone,
    this.userPhoto,
    required this.userRating,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    final userPhoto = _stringValue(json['userPhoto']);

    return Customer(
      userName: _stringValue(json['userName']),
      userPhone: _stringValue(json['userPhone']),
      userPhoto: userPhoto.isEmpty ? null : userPhoto,
      userRating: _stringValue(json['userRating']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userName': userName,
      'userPhone': userPhone,
      'userPhoto': userPhoto,
      'userRating': userRating,
    };
  }
}

class ParcalData {
  final String? name;
  final String? weight;
  final String? reciverName;
  final String? reciverNumber;
  final String? instruction;

  ParcalData({
    this.name,
    this.weight,
    this.reciverName,
    this.reciverNumber,
    this.instruction,
  });

  factory ParcalData.fromJson(Map<String, dynamic> json) {
    return ParcalData(
      name: _stringValue(json['name']),
      weight: _stringValue(json['weight']),
      reciverName: _stringValue(json['receiverName']),
      reciverNumber: _stringValue(json['receiverPhone']),
      instruction: _stringValue(json['pickupInstructions']),
    );
  }
}
