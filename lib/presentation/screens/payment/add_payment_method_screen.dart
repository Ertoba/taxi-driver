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
  final TextEditingController emailText = TextEditingController();
  final TextEditingController noteText = TextEditingController();
  final TextEditingController bankNameText = TextEditingController();
  final TextEditingController branchNameText = TextEditingController();
  final TextEditingController accountNumberText = TextEditingController();
  final TextEditingController accountNameText = TextEditingController();
  final TextEditingController ibanText = TextEditingController();
  final TextEditingController swiftText = TextEditingController();

  String get _type => widget.type.toString().trim().toLowerCase();
  bool get _isBankAccount => _type == 'bank account';
  bool get _isKeepzSplit => _type == 'keepz split receiver';

  @override
  void initState() {
    super.initState();
    final details = widget.paymentDetails;

    if (_isBankAccount) {
      bankNameText.text = details?.bankName ?? '';
      accountNumberText.text = details?.accountNumber ?? '';
      accountNameText.text = details?.accountName ?? '';
      ibanText.text = details?.iban ?? '';
      swiftText.text = details?.swiftCode ?? '';
      branchNameText.text = details?.branchName ?? '';
    } else if (_isKeepzSplit) {
      accountNameText.text = details?.accountName ?? '';
      ibanText.text = details?.keepzReceiverIdentifier ?? '';
    } else {
      emailText.text = details?.email ?? '';
      noteText.text = details?.note ?? '';
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
    final details = method.details;
    final type = method.payoutMethod?.trim().toLowerCase();
    final base = <String, dynamic>{
      'payout_method_id': method.id ?? 0,
      'is_active': details?.isActive ?? 0,
    };

    if (type == 'bank account') {
      base.addAll({
        'account_name': details?.accountName,
        'bank_name': details?.bankName,
        'branch_name': details?.branchName,
        'account_number': details?.accountNumber,
        'iban': details?.iban,
        'swift_code': details?.swiftCode,
      });
    } else if (type == 'keepz split receiver') {
      base.addAll({
        'account_name': details?.accountName,
        'keepz_receiver_type': details?.keepzReceiverType ?? 'IBAN',
        'keepz_receiver_identifier': details?.keepzReceiverIdentifier,
      });
    } else {
      base.addAll({
        'email': details?.email,
        'note': details?.note,
      });
    }

    return base;
  }

  Future<void> _submitPaymentDetails() async {
    if (!(_formKey.currentState?.validate() ?? false)) {
      showErrorToastMessage(
        _copy('Please fill all required details.', 'შეავსეთ ყველა სავალდებულო ველი.'),
      );
      return;
    }

    final parsedId = int.tryParse(widget.id.toString());
    if (parsedId == null || parsedId <= 0) {
      showErrorToastMessage('Invalid payment method ID: ${widget.id}');
      return;
    }

    final payoutMethodDetails = <String, dynamic>{
      'payout_method_id': parsedId,
      'is_active': 1,
    };

    if (_isBankAccount) {
      payoutMethodDetails.addAll({
        'account_name': accountNameText.text.trim(),
        'bank_name': bankNameText.text.trim(),
        'branch_name': branchNameText.text.trim(),
        'account_number': accountNumberText.text.trim(),
        'iban': ibanText.text.trim(),
        'swift_code': swiftText.text.trim(),
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
        'email': emailText.text.trim(),
        'note': noteText.text.trim(),
      });
    }

    final payoutMethods = widget.existingPayoutMethods
        .map(_serializeExistingMethod)
        .map((method) => method['payout_method_id'] == parsedId
            ? payoutMethodDetails
            : method)
        .toList();

    if (!payoutMethods.any(
      (method) => method['payout_method_id'] == parsedId,
    )) {
      payoutMethods.add(payoutMethodDetails);
    }

    context.read<PaymentMethodCubits>().addPaymentMethod(
      context,
      map: {
        'payout_methods': payoutMethods,
        'active_payout_method_id': parsedId,
      },
    );
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
        child: SafeArea(
          child: Form(
            key: _formKey,
            child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 28),
              children: [
                if (_isKeepzSplit) ..._buildKeepzFields(),
                if (_isBankAccount) ..._buildBankFields(),
                if (!_isKeepzSplit && !_isBankAccount) ..._buildGenericFields(),
                const SizedBox(height: 24),
                CustomsButtons(
                  text: 'Submit'.translate(context),
                  backgroundColor: themeColor,
                  onPressed: _submitPaymentDetails,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildKeepzFields() {
    return [
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
          style: TextStyle(color: notifires.getGrey1whiteColor, height: 1.4),
        ),
      ),
      const SizedBox(height: 18),
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
    ];
  }

  List<Widget> _buildBankFields() {
    return [
      _requiredField('Account Name', accountNameText, TextInputType.text),
      const SizedBox(height: 16),
      _requiredField('Account Number', accountNumberText, TextInputType.text),
      const SizedBox(height: 16),
      _requiredField('Bank Name', bankNameText, TextInputType.text),
      const SizedBox(height: 16),
      TextFieldAdvance(
        inputAlignment: TextAlign.start,
        txt: 'Branch Name'.translate(context),
        inputType: TextInputType.text,
        textEditingControllerCommon: branchNameText,
      ),
      const SizedBox(height: 16),
      TextFieldAdvance(
        inputAlignment: TextAlign.start,
        txt: 'IBAN'.translate(context),
        inputType: TextInputType.text,
        textEditingControllerCommon: ibanText,
      ),
      const SizedBox(height: 16),
      TextFieldAdvance(
        inputAlignment: TextAlign.start,
        txt: 'SWIFT/BIC Code'.translate(context),
        inputType: TextInputType.text,
        textEditingControllerCommon: swiftText,
      ),
    ];
  }

  List<Widget> _buildGenericFields() {
    return [
      TextFieldAdvance(
        validator: (value) {
          if (_type == 'upi') {
            return value == null || value.trim().isEmpty
                ? 'Please enter the Upi ID'.translate(context)
                : null;
          }
          return validateEmail(value ?? '', context);
        },
        inputAlignment: TextAlign.start,
        txt: (_type == 'upi' ? 'UPI' : 'Email').translate(context),
        textEditingControllerCommon: emailText,
        inputType: _type == 'upi'
            ? TextInputType.text
            : TextInputType.emailAddress,
        maxlines: null,
        icons: Icon(
          _type == 'upi' ? Icons.money : Icons.email,
          color: themeColor,
        ),
      ),
      const SizedBox(height: 16),
      TextFieldAdvance(
        maxlength: 1000,
        inputAlignment: TextAlign.start,
        minlines: 5,
        txt: 'Note..'.translate(context),
        textEditingControllerCommon: noteText,
        inputType: TextInputType.text,
        maxlines: 8,
        textInputAction: TextInputAction.done,
      ),
    ];
  }

  Widget _requiredField(
    String label,
    TextEditingController controller,
    TextInputType inputType,
  ) {
    return TextFieldAdvance(
      inputAlignment: TextAlign.start,
      txt: label.translate(context),
      inputType: inputType,
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return label.translate(context);
        }
        return null;
      },
      textEditingControllerCommon: controller,
    );
  }
}
