module.exports = {
  parseDate(date) {
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  },
  bookAttrHash(attr) {
    switch(attr){
      case 'bookCopyId': return '副本号';
      case 'price': return '价格';
      case 'groupId': return '所属小组号';
      case 'keeper': return '保管人';
      case 'location': return '所在位置';
      // case 'isLent': return '是否已经外借';
      // case 'isBooked': return '是否已经被预约';
      case 'bookName': return '图书名称';
      case 'boughtTime': return '购买时间';
      case 'buyer': return '购买人';
      case 'deadline': return '借阅截止日期';
      case 'booker': return '预约人';
    }
  },
  keeperAttrHash(attr){
    switch(attr){
      
    }
  },
  valueHash(val){
    switch(val){
      case 'true': return '是';
      case 'false': return '否';
      default: return val; 
    }

  },
  formatPeriod(month, day){
    //2,3 -> 02-03
    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;
    return month + '-' + day;
  },

}