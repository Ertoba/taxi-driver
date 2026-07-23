import 'package:flutter_test/flutter_test.dart';
import 'package:ride_on_driver/core/utils/keepz_iban.dart';

void main() {
  test('normalizes and validates Georgian IBAN', () {
    const input = 'ge29 nb00 0000 0101 9049 17';

    expect(normalizeGeorgianIban(input), 'GE29NB0000000101904917');
    expect(isValidGeorgianIban(input), isTrue);
  });

  test('rejects invalid and foreign IBAN values', () {
    expect(isValidGeorgianIban('GE00INVALID'), isFalse);
    expect(isValidGeorgianIban('DE89370400440532013000'), isFalse);
  });

  test('masks the middle of the IBAN', () {
    final masked = maskGeorgianIban('GE29NB0000000101904917');

    expect(masked.startsWith('GE29'), isTrue);
    expect(masked.endsWith('4917'), isTrue);
    expect(masked.contains('*'), isTrue);
  });
}
