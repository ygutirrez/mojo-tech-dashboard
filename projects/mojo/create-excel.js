const ExcelJS = require('exceljs');

async function createPriceSheet() {
  const workbook = new ExcelJS.Workbook();
  const ws = workbook.addWorksheet('Master Price Sheet');

  // MoJo Colors
  const mojoGreen = '1B5E20';
  const mojoLightGreen = '4CAF50';
  const mojoYellow = 'FFEB3B';
  const lightGray = 'F5F5F5';

  // Set column widths
  ws.columns = [
    { width: 28 },
    { width: 20 },
    { width: 22 },
    { width: 16 },
    { width: 14 },
    { width: 14 }
  ];

  // Helper function for section headers
  const addSectionHeader = (text) => {
    const row = ws.addRow([text]);
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: mojoGreen } };
    row.getCell(1).font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 };
    row.getCell(1).alignment = { horizontal: 'left' };
    ws.mergeCells(row.number, 1, row.number, 6);
    return row;
  };

  // Helper for column headers
  const addColumnHeaders = (headers) => {
    const row = ws.addRow(headers);
    headers.forEach((h, i) => {
      const cell = row.getCell(i + 1);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: mojoYellow } };
      cell.font = { bold: true };
      cell.border = { bottom: { style: 'thin' } };
    });
    return row;
  };

  // Helper for data rows with alternating colors
  const addDataRow = (data, isAlt) => {
    const row = ws.addRow(data);
    if (isAlt) {
      data.forEach((d, i) => {
        row.getCell(i + 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E8F5E9' } };
      });
    }
    return row;
  };

  // === TITLE ===
  const titleRow = ws.addRow(['MOSQUITO JOE OF MIAMI - MASTER PRICE SHEET 2026']);
  ws.mergeCells(1, 1, 1, 6);
  titleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: mojoGreen } };
  titleRow.getCell(1).font = { bold: true, color: { argb: 'FFFFFF' }, size: 16 };
  titleRow.getCell(1).alignment = { horizontal: 'center' };
  titleRow.height = 30;
  
  ws.addRow([]);

  // === MOSQUITO CONTROL ===
  addSectionHeader('MOSQUITO CONTROL SERVICES (by Lot Sq Ft)');
  addColumnHeaders(['Lot Sq Ft', '3-Week', 'QS Program (15% off)', 'QS Final Price', 'Keys Pricing', 'Event Pricing']);
  addDataRow(['0 - 5,000', '$59.99', '-$9.00', '$50.99', '$69.99', '$129.98'], false);
  addDataRow(['5,001 - 7,000', '$65.99', '-$9.90', '$56.09', '$69.99', '$141.98'], true);
  addDataRow(['7,001 - 12,000', '$75.99', '-$11.40', '$64.59', '$79.99', '$161.98'], false);
  addDataRow(['12,001 - 22,000', '$85.99', '-$12.90', '$73.09', '$89.99', '$181.98'], true);
  addDataRow(['22,001 - 45,000', '$105.99', '-$15.90', '$90.09', '$109.99', '$221.98'], false);
  addDataRow(['45,001 - 55,000', '$120.99', '-$18.15', '$102.84', '$124.99', '$251.98'], true);
  addDataRow(['55,001+', 'Individual Quote', '', '', '', ''], false);
  ws.addRow(['Reference: 1/2 Acre = 21,780 sq ft | 1 Acre = 43,560 sq ft']).font = { italic: true, size: 9 };
  ws.addRow([]);

  // === HPD STANDALONE ===
  addSectionHeader('HOME PEST DEFENSE - STANDALONE (by Inside Sq Ft) - New Customers');
  addColumnHeaders(['Inside Sq Ft', 'Initial', 'Maintenance']);
  addDataRow(['< 1,500', '$125', '$65'], false);
  addDataRow(['1,500 - 2,000', '$150', '$70'], true);
  addDataRow(['2,000 - 2,500', '$175', '$80'], false);
  addDataRow(['2,500 - 3,000', '$200', '$90'], true);
  addDataRow(['3,000 - 3,500', '$225', '$100'], false);
  addDataRow(['3,500 - 4,000', '$250', '$125'], true);
  addDataRow(['4,000 - 4,500', '$275', '$150'], false);
  addDataRow(['4,500 - 5,000', '$300', '$175'], true);
  addDataRow(['5,000 - 5,500', '$325', '$200'], false);
  addDataRow(['5,500+', '$350', '$225'], true);
  ws.addRow([]);

  // === HPD BUNDLE ===
  addSectionHeader('HOME PEST DEFENSE - BUNDLE (by Inside Sq Ft) - Current MoJo Customers');
  addColumnHeaders(['Inside Sq Ft', 'Initial*', 'Maintenance']);
  addDataRow(['< 1,500', '$100', '$52'], false);
  addDataRow(['1,500 - 2,000', '$120', '$56'], true);
  addDataRow(['2,000 - 2,500', '$140', '$64'], false);
  addDataRow(['2,500 - 3,000', '$160', '$72'], true);
  addDataRow(['3,000 - 3,500', '$180', '$80'], false);
  addDataRow(['3,500 - 4,000', '$200', '$100'], true);
  addDataRow(['4,000 - 4,500', '$220', '$120'], false);
  addDataRow(['4,500 - 5,000', '$240', '$140'], true);
  addDataRow(['5,000 - 5,500', '$260', '$160'], false);
  addDataRow(['5,500+', '$280', '$180'], true);
  ws.addRow(['*Initial Fee waived for current customers | Initial = Inside + Outside | Maintenance = Perimeter only (42 days)']).font = { italic: true, size: 9 };
  ws.addRow(['Does NOT include: Bed bugs, German roaches, or infestations']).font = { italic: true, size: 9 };
  ws.addRow([]);

  // === PERIMETER PEST ===
  addSectionHeader('PERIMETER PEST CONTROL (by Lot Sq Ft)');
  addColumnHeaders(['Lot Sq Ft', 'WITH Mosquito Service', 'WITHOUT Mosquito Service']);
  addDataRow(['Up to 12,000', '$63.99', '$99.99'], false);
  addDataRow(['12,001 - 22,000', '$75.99', '$110.99'], true);
  addDataRow(['22,001 - 45,000', '$85.99', '$119.99'], false);
  addDataRow(['45,001 - 55,000', '$105.99', '$129.99'], true);
  ws.addRow([]);

  // === NO-SEE-UM ===
  addSectionHeader('NO-SEE-UM TREATMENT (Includes Mosquito Barrier)');
  addColumnHeaders(['Property Size', 'Price']);
  addDataRow(['Trailer/Mobile Home', '$59.99'], false);
  addDataRow(['Townhouse', '$99.99'], true);
  addDataRow(['Up to 10,890', '$124.99'], false);
  addDataRow(['10,890 - 21,780', '$129.99'], true);
  addDataRow(['21,781 - 32,670', '$134.99'], false);
  addDataRow(['32,670 - 43,560', '$149.99'], true);
  addDataRow(['43,561 - 65,340', '$179.99'], false);
  addDataRow(['65,341 - 87,120', '$199.99'], true);
  ws.addRow([]);

  // === ADD-ONS ===
  addSectionHeader('ADD-ON SERVICES');
  ws.addRow([]);
  
  ws.addRow(['MISTING SYSTEM REFILLS']).font = { bold: true };
  addColumnHeaders(['Service', 'Price']);
  addDataRow(['Bi-Monthly Refill (any product)', '$230'], false);
  ws.addRow([]);
  
  ws.addRow(['MOSQUITO TRAPS']).font = { bold: true };
  addColumnHeaders(['Product', 'Installation', 'Refill', 'Notes']);
  addDataRow(['Inzecto Traps', '$24.99/trap', '-', 'Minimum 2 per home'], false);
  addDataRow(['In2Care Traps', '$48/trap', '$28/trap', 'Minimum 2 per home'], true);
  ws.addRow([]);
  
  ws.addRow(['RODENT CONTROL']).font = { bold: true };
  addColumnHeaders(['Service', 'Price']);
  addDataRow(['Initial Trap Setup', '$45'], false);
  addDataRow(['Bait', '$25/box'], true);
  addDataRow(['Monthly Service', '$25/month'], false);
  ws.addRow([]);

  // Footer
  const footerRow = ws.addRow(['Last Updated: January 2026']);
  footerRow.font = { italic: true, size: 9 };

  // Save
  await workbook.xlsx.writeFile(process.env.HOME + '/Desktop/MoJo-Price-Sheet-2026.xlsx');
  console.log('Excel file created with MoJo colors!');
}

createPriceSheet();
