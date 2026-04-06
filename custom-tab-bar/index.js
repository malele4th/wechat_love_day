Component({
  data: {
    value: '',
    list: [
      {
        icon: 'home',
        value: 'home',
        label: '日记',
      },
      {
        icon: 'user',
        value: 'my',
        label: '设置',
      },
    ],
  },
  lifetimes: {
    ready() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      if (!curPage) return;
      const nameRe = /pages\/(\w+)\/index/.exec(curPage.route);
      if (nameRe && nameRe[1]) {
        this.setData({ value: nameRe[1] });
      }
    },
  },
  methods: {
    handleChange(e) {
      const { value } = e.detail;
      wx.switchTab({ url: `/pages/${value}/index` });
    },
  },
});
