import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ride_on_driver/core/utils/keepz_iban.dart';
import 'package:ride_on_driver/core/utils/theme/project_color.dart';
import 'package:ride_on_driver/core/utils/translate.dart';

import '../../../core/utils/common_widget.dart';
import '../../../domain/entities/get_payment_type.dart';
import '../../cubits/payment/payment_method_cubit.dart';
import '../../widgets/custom_text_form_field.dart';
import '../../widgets/form_validations.dart';

class AddPaymentDetails extends StatefulWidget {
  final dynamic id;
  final dynamic addedit;
  final dynamic type;
  final PaymentDetails? paymentDetails;
  final List<PayoutMethod> existingPayoutMethods;

  const AddPaymentDetails({
    super.key,
    required this.id,
    this.addedit,
    required this.type,
    required this.existingPayoutMethods,
    this.paymentDetails,
  });

  @override
  State<AddPaymentDetails> createState() => _AddPaymentDetailsState();
}

class _AddPaymentDetailsState extends State<AddPaymentDetails> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final GlobalKey<FormState> globalKey = GlobalKey<FormState>();

  final TextEditingController emailText = TextEditingController();
  final TextEditingController noteText = TextEditingController();
  final TextEditingController bankNameText = TextEditingController();
  final TextEditingController branchNameText = TextEditingController();
  final TextEditingController accountNumberText = TextEditingController();
  final TextEditingController accountNameText = TextEditingController();
  final TextEditingController ibanText = TextEditingController();
  final TextEditingController swiftText = TextEditingController();

  String get _normalizedType => widget.type.toString().trim().toLowerCase();
  bool get _isBankAccount => _normalizedType == 'bank account';
  bool get _isKeepzSplit => _normalizedType == 'keepz split receiver';

  @override
  void initState() {
    super.initState();

    if (_isBankAccount) {
      bankNameText.text = widget.paymentDetails?.bankName ?? '';
      accountNumberText.text = widget.paymentDetails?.accountNumber ?? '';
      accountNameText.text = widget.paymentDetails?.accountName ?? '';
      ibanText.text = widget.paymentDetails?.iban ?? '';
      swiftText.text = widget.paymentDetails?.swiftCode ?? '';
      branchNameText.text = widget.paymentDetails?.branchName ?? '';
    } else if (_isKeepzSplit) {
      accountNameText.text = widget.paymentDetails?.accountName ?? '';
      ibanText.text = widget.paymentDetails?.keepzReceiverIdentifier ?? '';
    } else {
      emailText.text = widget.paymentDetails?.email ?? '';
      noteText.text = widget.paymentDetails?.note ?? '';
    }
  }

  @override
  void dispose() {
    emailText.dispose();
    noteText.dispose();
    bankNameText.dispose();
    branchNameText.dispose();
    accountNumberText.dispose();
    accountNameText.dispose();
    ibanText.dispose();
    swiftText.dispose();
    super.dispose();
  }

  String _copy(String english, String georgian) {
    return Localizations.localeOf(context).languageCode == 'ka'
        ? georgian
        : english;
  }

  Map<String, dynamic> _serializeExistingMethod(PayoutMethod method) {
    final int parsedMethodId = int.tryParse(method.id.toString()) ?? 0;
    final type = method.payoutMethod?.trim().toLowerCase();

    return {
      'payout_method_id': parsedMethodId,
      'is_active': method.details?.isActive ?? 0,
      if (type == 'bank account') ...{
        'account_name': method.details?.accountName,
        'bank_name': method.details?.bankName,
        'branch_name': method.details?.branchName,
        'account_number': method.details?.accountNumber,
        'iban': method.details?.iban,
        'swift_code': method.details?.swiftCode,
      } else if (type == 'keepz split receiver') ...{
        'account_name': method.details?.accountName,
        'keepz_receiver_type': method.details?.keepzReceiverType ?? 'IBAN',
        'keepz_receiver_identifier':
            method.details?.keepzReceiverIdentifier,
      } else ...{
        'email': method.details?.email,
        'note': method.details?.note,
      },
    };
  }

  Future<void> submitPaymentDetails() async {
    try {
      final int? parsedId = int.tryParse(widget.id.toString());
      if (parsedId == null) {
        showErrorToastMessage('Invalid payment method ID: ${widget.id}');
        return;
      }

      final Map<String, dynamic> payoutMethodDetails = {
        'payout_method_id': parsedId,
        'is_active': 1,
      };

      if (_isBankAccount) {
        payoutMethodDetails.addAll({
          'account_name': accountNameText.text,
          'bank_name': bankNameText.text,
          'branch_name': branchNameText.text,
          'account_number': accountNumberText.text,
          'iban': ibanText.text,
          'swift_code': swiftText.text,
        });
      } else if (_isKeepzSplit) {
        final normalizedIban = normalizeGeorgianIban(ibanText.text);
        if (!isValidGeorgianIban(normalizedIban)) {
          showErrorToastMessage(
            _copy(
              'Enter a valid Georgian IBAN.',
              'შეიყვანეთ სწორი ქართული IBAN ანგარიში.',
            ),
          );
          return;
        }

        payoutMethodDetails.addAll({
          'account_name': accountNameText.text.trim(),
          'keepz_receiver_type': 'IBAN',
          'keepz_receiver_identifier': normalizedIban,
        });
      } else {
        payoutMethodDetails.addAll({
          'email': emailText.text,
          'note': noteText.text,
        });
      }

      final List<Map<String, dynamic>> payoutMethodsList =
          widget.existingPayoutMethods.map((method) {
        if (int.tryParse(method.id.toString()) == parsedId) {
          return payoutMethodDetails;
        }
        return _serializeExistingMethod(method);
      }).toList();

      if (!widget.existingPayoutMethods
          .any((method) => int.tryParse(method.id.toString()) == parsedId)) {
        payoutMethodsList.add(payoutMethodDetails);
      }

      context.read<PaymentMethodCubits>().addPaymentMethod(
        context,
        map: {
          'payout_methods': payoutMethodsList,
          'active_payout_method_id': parsedId,
        },
      );
    } catch (e) {
      showErrorToastMessage('An error occurred: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = _isKeepzSplit
        ? _copy('Keepz Split Receiver', 'Keepz Split ანგარიში')
        : '${widget.addedit.toString().translate(context)} '
            '${toTitleCaseFromCamel(widget.type ?? '').translate(context)} '
            '${'Details'.translate(context)}';

    return Scaffold(
      backgroundColor: notifires.getbgcolor,
      appBar: CustomAppBar(
        title: title,
        backgroundColor: notifires.getbgcolor,
        titleColor: notifires.getGrey1whiteColor,
      ),
      body: BlocListener<PaymentMethodCubits, PaymentMethodState>(
        listener: (context, state) {
          if (state is AddPaymentMethodLoading) {
            Widgets.showLoader(context);
          } else if (state is AddPaymentMethodSuccess) {
            Widgets.hideLoder(context);
            context.read<PaymentMethodCubits>().getPaymentMethod(context);
            goBack();
          } else if (state is PaymentMethodFailure) {
            Widgets.hideLoder(context);
            showErrorToastMessage(state.error);
          }
        },
        child: Padding(
          padding: const EdgeInsets.only(top: 10, left: 20, right: 20),
          child: _isBankAccount
              ? _buildBankAccountForm()
              : _isKeepzSplit
                  ? _buildKeepzForm()
                  : _buildGenericForm(),
        ),
      ),
    );
  }

  Widget _buildKeepzForm() {
    return Form(
      key: _formKey,
      child: ListView(
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: themeColor.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              _copy(
                'Your ride share will be transferred directly to this Georgian IBAN after a successful Keepz card payment. No card data or Keepz keys are stored here.',
                'Keepz-ით ბარათით წარმატებული გადახდის შემდეგ მგზავრობის თქვენი წილი პირდაპირ ამ ქართულ IBAN ანგარიშზე ჩაირიცხება. აქ ბარათის მონაცემები ან Keepz-ის გასაღებები არ ინახება.',
              ),
              style: TextStyle(
                color: notifires.getGrey1whiteColor,
                height: 1.4,
              ),
            ),
          ),
          const SizedBox(height: 20),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: _copy('Account holder', 'ანგარიშის მფლობელი'),
            inputType: TextInputType.name,
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return _copy(
                  'Account holder is required.',
                  'ანგარიშის მფლობელი სავალდებულოა.',
                );
              }
              return null;
            },
            textEditingControllerCommon: accountNameText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: _copy('Georgian IBAN', 'ქართული IBAN ანგარიში'),
            inputType: TextInputType.text,
            validator: (value) {
              if (value == null || !isValidGeorgianIban(value)) {
                return _copy(
                  'Use the format GE00AA0000000000000000.',
                  'გამოიყენეთ ფორმატი GE00AA0000000000000000.',
                );
              }
              return null;
            },
            textEditingControllerCommon: ibanText,
          ),
          const SizedBox(height: 25),
          CustomsButtons(
            text: 'Submit'.translate(context),
            backgroundColor: themeColor,
            onPressed: () {
              if (!(_formKey.currentState?.validate() ?? false)) {
                showErrorToastMessage(
                  _copy(
                    'Please fill all the details.',
                    'შეავსეთ ყველა საჭირო ველი.',
                  ),
                );
                return;
              }
              submitPaymentDetails();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildBankAccountForm() {
    return Form(
      key: globalKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: 'Account Name'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'Account Name'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: accountNameText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: 'Account Number'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'Account number is Empty'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: accountNumberText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.left,
            txt: 'Bank Name'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'Bank Name'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: bankNameText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: 'Branch Name'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'Branch Name is Empty'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: branchNameText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: 'IBAN Name'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'IBAN is Empty'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: ibanText,
          ),
          const SizedBox(height: 16),
          TextFieldAdvance(
            inputAlignment: TextAlign.start,
            txt: 'SWIFT/BIC Code'.translate(context),
            inputType: TextInputType.text,
            validator: (value) {
              if (value != null && value.isEmpty) {
                return 'SWIFT/BIC Code is Empty'.translate(context);
              }
              return null;
            },
            textEditingControllerCommon: swiftText,
          ),
          const SizedBox(height: 16),
          CustomsButtons(
            text: 'Submit'.translate(context),
            backgroundColor: themeColor,
            onPressed: submitPaymentDetails,
          ),
        ],
      ),
    );
  }

  Widget _buildGenericForm() {
    return Form(
      key: _formKey,
      child: ListView(
        children: [
          const SizedBox(height: 5),
          const SizedBox(height: 20),
          _normalizedType == 'upi'
              ? TextFieldAdvance(
                  validator: (value) {
                    if (value!.isEmpty) {
                      return 'Please enter the Upi ID'.translate(context);
                    }
                    return null;
                  },
                  inputAlignment: TextAlign.start,
                  txt: 'UPI'.translate(context),
                  textEditingControllerCommon: emailText,
                  inputType: TextInputType.emailAddress,
                  maxlines: null,
                  icons: Icon(Icons.money, color: themeColor),
                )
              : TextFieldAdvance(
                  validator: (value) {
                    return validateEmail(value!, context);
                  },
                  inputAlignment: TextAlign.start,
                  txt: 'Email'.translate(context),
                  textEditingControllerCommon: emailText,
                  inputType: TextInputType.emailAddress,
                  maxlines: null,
                  icons: Icon(Icons.email, color: themeColor),
                ),
          const SizedBox(height: 10),
          TextFieldAdvance(
            validator: (value) {
              if (value!.isEmpty) {
                return 'Please enter the note'.translate(context);
              }
              return null;
            },
            maxlength: 1000,
            inputAlignment: TextAlign.start,
            minlines: 10,
            txt: 'Note..'.translate(context),
            textEditingControllerCommon: noteText,
            inputType: TextInputType.text,
            maxlines: 10,
            textInputAction: TextInputAction.done,
            onChange: (value) {
              if (value!.length > 5000) {
                noteText.text = value.substring(0, 1000);
                noteText.selection = TextSelection.fromPosition(
                  TextPosition(offset: noteText.text.length),
                );
              }
              setState(() {});
              return value;
            },
          ),
          const SizedBox(height: 25),
          CustomsButtons(
            text: 'Submit'.translate(context),
            backgroundColor: themeColor,
            onPressed: () {
              if (!(_formKey.currentState?.validate() ?? false)) {
                showErrorToastMessage(
                  'Please fill all the details'.translate(context),
                );
                return;
              }
              submitPaymentDetails();
            },
          ),
        ],
      ),
    );
  }
}
