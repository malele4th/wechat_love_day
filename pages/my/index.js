import useToastBehavior from '~/behaviors/useToast';
import { getLoveStartDate, setLoveStartDate, formatTodayYMD } from '~/utils/loveDay';

Page({
  behaviors: [useToastBehavior],

  data: {
    loveStartDate: '',
    pickerValue: '',
    displayNote: '',
    endDate: '',
  },

  onLoad() {
    this.syncFromStorage();
  },

  onShow() {
    this.syncFromStorage();
  },

  syncFromStorage() {
    const endDate = formatTodayYMD();
    const loveStartDate = getLoveStartDate();
    const pickerValue = loveStartDate || endDate;
    const displayNote = loveStartDate || '未设置，点击选择';
    this.setData({ endDate, loveStartDate, pickerValue, displayNote });
  },

  onDateChange(e) {
    const value = e.detail.value;
    setLoveStartDate(value);
    this.setData({
      loveStartDate: value,
      pickerValue: value,
      displayNote: value,
    });
    this.onShowToast('#t-toast', '已保存');
  },
});
