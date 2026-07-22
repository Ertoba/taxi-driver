import 'dart:convert';

import 'package:ride_on_driver/data/repositories/auth_repository.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../core/extensions/workspace.dart';
import '../../../core/services/data_store.dart';
import '../../../domain/entities/login.dart';
import '../logout_cubit.dart';
import '../register_vehicle/vehicle_register_cubit.dart';

abstract class AuthUserAuthenticateState extends Equatable {
  @override
  List<Object?> get props => [];
}

class UserInitial extends AuthUserAuthenticateState {}

class UserLoading extends AuthUserAuthenticateState {}

class UserSucesss extends AuthUserAuthenticateState {
  final LoginModel loginModel;
  UserSucesss(this.loginModel);

  @override
  List<Object?> get props => [loginModel];
}

class UserFailure extends AuthUserAuthenticateState {
  final String error;
  UserFailure(this.error);

  @override
  List<Object?> get props => [error];
}

class AuthUserAuthenticateCubit extends Cubit<AuthUserAuthenticateState> {
  AuthRepository authRepository;
  AuthUserAuthenticateCubit(this.authRepository) : super(UserInitial());

  Future<void> userAuthenticate({
    required BuildContext context,
    required String phoneNumber,
    required String phoneCountry,
    required String otpValue,
  }) async {
    emit(UserLoading());
    clearData(context);

    final response = await authRepository.userAuthenticateLogin(
      context: context,
      phoneNumber: phoneNumber,
      phoneCountry: phoneCountry,
      otpValue: otpValue,
    );

    if (response['status'] == 200) {
      box.put('Remember', true);
      box.put('Firstuser', true);
      final userObj = UserData();
      loginModel = LoginModel.fromJson(response);
      userObj.saveLoginData('UserData', jsonEncode(response));

      if (loginModel != null && loginModel!.data != null) {
        token = loginModel!.data!.token ?? '';

        if (loginModel!.data!.itemTypeId != null) {
          box.put('itemTypeId', true);
          context.read<GetItemIdCubit>().updateItemId(
                itemTypeId: loginModel!.data!.itemTypeId!.toString(),
              );
        } else {
          box.put('itemTypeId', false);
        }

        box.put(
          'remainingItems',
          loginModel!.data!.remainingItems == 0,
        );
        box.put(
          'gender',
          loginModel!.data!.gender?.isNotEmpty ?? false,
        );
      }

      emit(UserSucesss(LoginModel.fromJson(response)));
    } else {
      emit(UserFailure(response['error']));
    }
  }

  void resetState() {
    emit(UserInitial());
  }
}

class SetCountryState extends Equatable {
  final String dialCode;
  final String countryCode;

  const SetCountryState({
    required this.dialCode,
    required this.countryCode,
  });

  SetCountryState copyWith({
    String? dialCode,
    String? countryCode,
  }) {
    return SetCountryState(
      dialCode: dialCode ?? this.dialCode,
      countryCode: countryCode ?? this.countryCode,
    );
  }

  @override
  List<Object?> get props => [dialCode, countryCode];
}

class SetCountryCubit extends Cubit<SetCountryState> {
  static const georgia = SetCountryState(
    dialCode: '+995',
    countryCode: 'GE',
  );

  SetCountryCubit() : super(georgia);

  void setCountry({required String dialCode, required String countryCode}) {
    emit(SetCountryState(dialCode: dialCode, countryCode: countryCode));
  }

  void reset() {
    emit(georgia);
  }

  void clear() {
    emit(georgia);
  }
}
