const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const result = excelToJson({
  sourceFile: 'its_route.xlsx',
});
// console.log(result['Sheet1'][0]);
let final = result['Sheet1'];
// console.log(final[0]);
final = final.map((el) => {
  el['route_id'] = el['A'];
  delete el['A'];
  el['route_number'] = el['B'];
  delete el['B'];
  el['start_point_id'] = el['C'];
  delete el['C'];
  el['end_point_id'] = el['D'];
  delete el['D'];
  el['route_type'] = el['E'];
  delete el['E'];
  el['route_name'] = el['F'];
  delete el['F'];
  el['status'] = el['G'];
  delete el['G'];
  el['via'] = el['H'];
  delete el['H'];
  el['description'] = el['I'];
  delete el['I'];
  el['deleted_status'] = el['J'];
  delete el['J'];
  el['route_direction'] = el['K'];
  delete el['K'];
  // el['city_limit'] = el['L'];
  delete el['L'];
  // el['stop_size'] = el['M'];
  delete el['M'];
  // el['fare_stage'] = el['N'];
  delete el['N'];
  // el['sub_stage'] = el['O'];
  delete el['O'];
  // el['local_bus_stop_id'] = el['P'];
  delete el['P'];
  // el['point_type_id'] = el['Q'];
  delete el['Q'];
  // el['route_status'] = el['R'];
  delete el['R'];
  return el;
});

console.log(final[0]);
const json = JSON.stringify(final);

fs.writeFile('bus_routes.json', json, 'utf8', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('ok');
  }
});
