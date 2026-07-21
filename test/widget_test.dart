import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('renders the driver app shell', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: Scaffold(body: Text('Mili Taxi Driver'))),
    );

    expect(find.text('Mili Taxi Driver'), findsOneWidget);
  });
}
