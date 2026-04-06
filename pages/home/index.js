import { getLoveStartDate, getLoveDayCount } from '~/utils/loveDay';

Page({
  data: {
    state: 'empty',
    dayCount: null,
    loveStartDate: '',
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const loveStartDate = getLoveStartDate();
    const dayCount = getLoveDayCount();
    let state = 'empty';
    if (loveStartDate && dayCount != null) state = 'active';
    else if (loveStartDate) state = 'invalid';
    this.setData({ state, dayCount, loveStartDate });
  },

  goSettings() {
    wx.switchTab({ url: '/pages/my/index' });
  },
});
