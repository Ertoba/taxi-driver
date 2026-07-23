String normalizeGeorgianIban(String value) {
  return value.replaceAll(RegExp(r'\s+'), '').toUpperCase();
}

bool isValidGeorgianIban(String value) {
  return RegExp(r'^GE\d{2}[A-Z]{2}\d{16}$')
      .hasMatch(normalizeGeorgianIban(value));
}

String maskGeorgianIban(String value) {
  final normalized = normalizeGeorgianIban(value);
  if (normalized.length < 8) return normalized;

  final hidden = List.filled(normalized.length - 8, '*').join();
  return '${normalized.substring(0, 4)}'
      '$hidden'
      '${normalized.substring(normalized.length - 4)}';
}
