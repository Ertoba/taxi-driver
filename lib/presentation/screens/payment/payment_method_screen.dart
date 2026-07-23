import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ride_on_driver/core/utils/translate.dart';

import '../../../../core/utils/theme/project_color.dart';
import '../../../../core/utils/theme/theme_style.dart';
import '../../../core/utils/common_widget.dart';
import '../../../domain/entities/get_payment_type.dart';
import '../../../domain/entities/payment_method.dart';
import '../../cubits/payment/payment_method_cubit.dart';
import 'add_payment_method_screen.dart';

class PaymentMethodsScreen extends StatefulWidget {
  const PaymentMethodsScreen({super.key});

  @override
  State<PaymentMethodsScreen> createState() => _PaymentMethodsScreenState();
}

class _PaymentMethodsScreenState extends State<PaymentMethodsScreen> {
  List<PayoutMethod> paymentMethodsList = [];
  List<PayoutTypes> payOutList = [];

  @override
  void initState() {
    super.initState();
    context.read<PaymentMethodCubits>().getPayoutType(context);
  }

  String _copy(String english, String georgian) {
    return Localizations.localeOf(context).languageCode == 'ka'
        ? georgian
        : english;
  }

  String _normalizedType(String? value) => value?.trim().toLowerCase() ?? '';

  PaymentDetails? _detailsFor(PayoutTypes payoutType) {
    for (final method in paymentMethodsList) {
      if (method.id == payoutType.id) return method.details;
    }
    return null;
  }

  bool _isConfigured(PayoutTypes payoutType) {
    return paymentMethodsList.any((method) => method.id == payoutType.id);
  }

  bool _isActive(PayoutTypes payoutType) {
    return _detailsFor(payoutType)?.isActive == 1;
  }

  String _statusText(PayoutTypes payoutType) {
    if (!_isConfigured(payoutType)) {
      return _copy('Not configured', 'არ არის გამართული');
    }
    return _isActive(payoutType)
        ? _copy('Active', 'აქტიური')
        : _copy('Inactive', 'არააქტიური');
  }

  Color _statusColor(PayoutTypes payoutType) {
    if (!_isConfigured(payoutType)) return Colors.grey;
    return _isActive(payoutType) ? Colors.green : Colors.red;
  }

  IconData _methodIcon(String? methodName) {
    switch (_normalizedType(methodName)) {
      case 'bank account':
        return Icons.account_balance;
      case 'keepz split receiver':
        return Icons.account_balance_wallet_outlined;
      case 'paypal':
        return Icons.payment;
      case 'stripe':
        return Icons.credit_card;
      case 'cash':
        return Icons.money;
      default:
        return Icons.payments_outlined;
    }
  }

  String _methodTitle(String? methodName) {
    if (_normalizedType(methodName) == 'keepz split receiver') {
      return _copy('KEEPZ SPLIT — IBAN', 'KEEPZ SPLIT — IBAN');
    }
    return (methodName ?? 'Unknown').toUpperCase();
  }

  String? _methodSubtitle(PayoutTypes payoutType) {
    if (_normalizedType(payoutType.name) != 'keepz split receiver') {
      return null;
    }

    final details = _detailsFor(payoutType);
    return details?.keepzReceiverIdentifierMasked ??
        _copy(
          'Save a Georgian IBAN for direct ride payouts',
          'შეინახეთ ქართული IBAN პირდაპირი ჩარიცხვებისთვის',
        );
  }

  void _openMethod(PayoutTypes payoutType) {
    goTo(AddPaymentDetails(
      addedit: _isConfigured(payoutType) ? 'Edit' : 'Add',
      id: payoutType.id ?? 0,
      type: payoutType.name ?? '',
      existingPayoutMethods: paymentMethodsList,
      paymentDetails: _detailsFor(payoutType),
    ));
  }

  Map<String, dynamic> _serializeMethod(
    PayoutMethod method, {
    int? overrideMethodId,
    int? overrideActive,
  }) {
    final details = method.details;
    final type = _normalizedType(method.payoutMethod);
    final methodId = method.id ?? 0;
    final payload = <String, dynamic>{
      'payout_method_id': methodId,
      'is_active': methodId == overrideMethodId
          ? overrideActive
          : (details?.isActive ?? 0),
    };

    if (type == 'bank account') {
      payload.addAll({
        'account_name': details?.accountName,
        'bank_name': details?.bankName,
        'branch_name': details?.branchName,
        'account_number': details?.accountNumber,
        'iban': details?.iban,
        'swift_code': details?.swiftCode,
      });
    } else if (type == 'keepz split receiver') {
      payload.addAll({
        'account_name': details?.accountName,
        'keepz_receiver_type': details?.keepzReceiverType ?? 'IBAN',
        'keepz_receiver_identifier': details?.keepzReceiverIdentifier,
      });
    } else {
      payload.addAll({
        'email': details?.email,
        'note': details?.note,
      });
    }

    return payload;
  }

  Future<void> _updateStatus(PayoutTypes payoutType, bool isActive) async {
    final methodId = payoutType.id;
    if (methodId == null || !_isConfigured(payoutType)) return;

    final payload = paymentMethodsList
        .map((method) => _serializeMethod(
              method,
              overrideMethodId: methodId,
              overrideActive: isActive ? 1 : 0,
            ))
        .toList();

    context.read<PaymentMethodCubits>().updateStatusPaymentMethod(
      context,
      map: {
        'payout_methods': payload,
        'active_payout_method_id': methodId,
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: notifires.getbgcolor,
      appBar: CustomAppBar(
        title: 'Add/Edit Payout Method'.translate(context),
        backgroundColor: notifires.getbgcolor,
        titleColor: notifires.getGrey1whiteColor,
      ),
      body: BlocConsumer<PaymentMethodCubits, PaymentMethodState>(
        listener: (context, state) {
          if (state is PaymentMethodSuccess) {
            setState(() {
              paymentMethodsList = state.model.data?.payoutMethods ?? [];
            });
            context.read<PaymentMethodCubits>().clear();
          } else if (state is UpdatePaymentMethodSuccess) {
            Widgets.hideLoder(context);
            setState(() {
              paymentMethodsList = state.model.data?.payoutMethods ?? [];
            });
            context.read<PaymentMethodCubits>().clear();
          } else if (state is UpdatedPaymentMethodLoading) {
            Widgets.showLoader(context);
          } else if (state is PaymentMethodFailure) {
            Widgets.hideLoder(context);
            showErrorToastMessage(state.error);
          }
        },
        builder: (context, state) {
          if (state is PayoutTypeLoading || state is PaymentMethodLoading) {
            return Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(themeColor),
              ),
            );
          }

          if (state is PayoutTypeSuccess) {
            payOutList = state.model.data?.payoutTypes ?? [];
          }

          return Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _copy(
                    'Add your preferred account to receive payouts securely.',
                    'დაამატეთ სასურველი ანგარიში ჩარიცხვების უსაფრთხოდ მისაღებად.',
                  ),
                  style: regular2(context).copyWith(
                    fontSize: 14,
                    color: notifires.getGrey1whiteColor.withValues(alpha: 0.7),
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 20),
                Expanded(child: _buildMethods()),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildMethods() {
    if (payOutList.isEmpty) {
      return Center(
        child: Text('Data not found'.translate(context), style: regular2(context)),
      );
    }

    return ListView.separated(
      itemCount: payOutList.length,
      separatorBuilder: (_, __) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final payoutType = payOutList[index];
        if (payoutType.id == null || payoutType.name == null) {
          return const SizedBox.shrink();
        }

        final configured = _isConfigured(payoutType);
        final active = _isActive(payoutType);
        final statusColor = _statusColor(payoutType);
        final subtitle = _methodSubtitle(payoutType);

        return Container(
          decoration: BoxDecoration(
            color: notifires.getbgcolor,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: notifires.getGrey1whiteColor.withValues(alpha: 0.25),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () => _openMethod(payoutType),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: themeColor.withValues(alpha: 0.35),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        _methodIcon(payoutType.name),
                        color: blackColor,
                        size: 22,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _methodTitle(payoutType.name),
                            style: heading3Grey1(context).copyWith(
                              fontSize: 15,
                              color: notifires.getGrey1whiteColor,
                            ),
                          ),
                          if (subtitle != null && subtitle.isNotEmpty) ...[
                            const SizedBox(height: 3),
                            Text(
                              subtitle,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: regular2(context).copyWith(
                                fontSize: 11,
                                color: notifires.getGrey1whiteColor
                                    .withValues(alpha: 0.65),
                              ),
                            ),
                          ],
                          const SizedBox(height: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 3,
                            ),
                            decoration: BoxDecoration(
                              color: statusColor.withValues(alpha: 0.10),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              _statusText(payoutType),
                              style: regular2(context).copyWith(
                                fontSize: 10,
                                color: statusColor,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (configured)
                      Transform.scale(
                        scale: 0.8,
                        child: Switch(
                          value: active,
                          onChanged: (value) => _updateStatus(payoutType, value),
                          activeThumbColor: Colors.green,
                          inactiveThumbColor: Colors.red,
                          materialTapTargetSize:
                              MaterialTapTargetSize.shrinkWrap,
                        ),
                      ),
                    IconButton(
                      onPressed: () => _openMethod(payoutType),
                      icon: Icon(
                        configured ? Icons.edit_outlined : Icons.add,
                        color: blackColor,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
