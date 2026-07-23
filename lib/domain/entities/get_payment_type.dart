class GetPaymentTypeModel {
  final int? status;
  final String? message;
  final Data? data;
  final String? error;

  GetPaymentTypeModel({
    this.status,
    this.message,
    this.data,
    this.error,
  });

  factory GetPaymentTypeModel.fromJson(Map<String, dynamic> json) {
    return GetPaymentTypeModel(
      status: json['status'] as int?,
      message: json['message'] as String?,
      data: json['data'] != null
          ? Data.fromJson(json['data'] as Map<String, dynamic>)
          : null,
      error: json['error']?.toString(),
    );
  }

  Map<String, dynamic> toJson() => {
        'status': status,
        'message': message,
        'data': data?.toJson(),
        'error': error,
      };
}

class Data {
  final List<PayoutMethod>? payoutMethods;

  Data({this.payoutMethods});

  factory Data.fromJson(Map<String, dynamic> json) {
    return Data(
      payoutMethods: (json['payout_methods'] as List<dynamic>?)
          ?.whereType<Map>()
          .map((entry) => PayoutMethod.fromJson(
                entry.map((key, value) => MapEntry(key.toString(), value)),
              ))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => {
        'payout_methods': payoutMethods?.map((entry) => entry.toJson()).toList(),
      };
}

class PayoutMethod {
  final int? id;
  final String? payoutMethod;
  final PaymentDetails? details;

  PayoutMethod({this.id, this.payoutMethod, this.details});

  factory PayoutMethod.fromJson(Map<String, dynamic> json) {
    return PayoutMethod(
      id: _asInt(json['id']),
      payoutMethod: json['payout_method']?.toString(),
      details: json['details'] is Map
          ? PaymentDetails.fromJson(
              (json['details'] as Map)
                  .map((key, value) => MapEntry(key.toString(), value)),
            )
          : null,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'payout_method': payoutMethod,
        'details': details?.toJson(),
      };
}

class PaymentDetails {
  final int? id;
  final int? isActive;
  final String? email;
  final String? note;
  final String? userId;
  final String? accountName;
  final String? bankName;
  final String? branchName;
  final String? accountNumber;
  final String? iban;
  final String? swiftCode;
  final String? keepzReceiverType;
  final String? keepzReceiverIdentifier;
  final String? keepzReceiverIdentifierMasked;
  final String? createdAt;
  final String? updatedAt;

  PaymentDetails({
    this.id,
    this.isActive,
    this.email,
    this.note,
    this.userId,
    this.accountName,
    this.bankName,
    this.branchName,
    this.accountNumber,
    this.iban,
    this.swiftCode,
    this.keepzReceiverType,
    this.keepzReceiverIdentifier,
    this.keepzReceiverIdentifierMasked,
    this.createdAt,
    this.updatedAt,
  });

  factory PaymentDetails.fromJson(Map<String, dynamic> json) {
    return PaymentDetails(
      id: _asInt(json['id']),
      isActive: _asInt(json['is_active']),
      email: json['email']?.toString(),
      note: json['note']?.toString(),
      userId: json['user_id']?.toString(),
      accountName: json['account_name']?.toString(),
      bankName: json['bank_name']?.toString(),
      branchName: json['branch_name']?.toString(),
      accountNumber: json['account_number']?.toString(),
      iban: json['iban']?.toString(),
      swiftCode: json['swift_code']?.toString(),
      keepzReceiverType: json['keepz_receiver_type']?.toString(),
      keepzReceiverIdentifier:
          json['keepz_receiver_identifier']?.toString(),
      keepzReceiverIdentifierMasked:
          json['keepz_receiver_identifier_masked']?.toString(),
      createdAt: json['created_at']?.toString(),
      updatedAt: json['updated_at']?.toString(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'is_active': isActive,
        'email': email,
        'note': note,
        'user_id': userId,
        'account_name': accountName,
        'bank_name': bankName,
        'branch_name': branchName,
        'account_number': accountNumber,
        'iban': iban,
        'swift_code': swiftCode,
        'keepz_receiver_type': keepzReceiverType,
        'keepz_receiver_identifier': keepzReceiverIdentifier,
        'keepz_receiver_identifier_masked': keepzReceiverIdentifierMasked,
        'created_at': createdAt,
        'updated_at': updatedAt,
      };
}

int? _asInt(dynamic value) {
  if (value is int) return value;
  return int.tryParse(value?.toString() ?? '');
}
