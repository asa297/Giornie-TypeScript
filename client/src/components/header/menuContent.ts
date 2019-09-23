export const reportMenu = [
  { name: 'PurchaseOrder', sub_name: 'PO', path: '/report/po' },
  { name: 'DeliveryNote', sub_name: 'DN', path: '/report/dn' },
  { name: 'Inventory', sub_name: 'Inventory', path: '/report/656' },
  { name: 'InBoundInventory', sub_name: 'IN-Inventory', path: '/report/1' },
  { name: 'OutBoundInventory', sub_name: 'OUT-Inventory', path: '/report/2' },
  { name: 'DailyInventory', sub_name: 'D-Inventory', path: '/report/3' },
  { name: 'DailyCashBalance', sub_name: 'D-CashBalance', path: '/report/4' },
  { name: 'DailyCommission', sub_name: 'D-Commission', path: '/report/5' },
]

export const mainMenu = [
  { name: 'Organization', path: '/org', type: 'build' },
  { name: 'Group', path: '/group', type: 'team' },
  { name: 'Seller', path: '/seller', type: 'user' },
  { name: 'Item', path: '/item', type: 'shop' },
  { name: 'PO', path: '/form/po', type: 'barcode' },
]
