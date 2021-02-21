<template>
  <div class="navbar">
    <ul>
      <li
        v-for="(item,index) in arry"
        :key="index"
        :class="[$attrs['active-id']===item.id?'acitved':'']"
        @click.stop.prevent="changeActiveId(item,index)"
        @mouseenter="pcDropdown(item,index,true,father)"
        @mouseleave="pcDropdown(item,index,false,father)"
      >
        <a class="nav-link white" @click.stop.prevent="go(item,index)">
          <span
            v-if="hasChildren(item)"
            :class="['expand-icon',item.expand?'expand':'']"
            @click.stop.prevent="changeActiveId(item,index)"
          >
            <i class="fas fa-angle-right"></i>
          </span>
          <span>{{ item.displayName }}</span>
        </a>
        <navbar-sub-items
          v-if="hasChildren(item)"
          :items="item.children"
          :expand="item.expand"
          v-bind="$attrs"
          @unExpandAll="unExpandAll"
          v-on="$listeners"
        ></navbar-sub-items>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'NavbarItems',
  data() {
    return {
      arry: []
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    father: {
      type: Boolean
    }
  },
  inheritAttrs: false,
  created() {
    this.arry = this.items.map(x => {
      x.expand = false
      return x
    })
  },
  methods: {
    go(item, index) {
      this.resetExpandStatus(item)
      if (item.navbarType !== 0) this.routerUrl(item)
      else if (this.hasChildren(item)) this.routerUrl(item.children[0])
    },

    changeActiveId(item, index) {
      this.resetExpandStatus(item)
      if (this.hasChildren(item)) this.setArray(item, index)
      else this.routerUrl(item)
    },

    pcDropdown(item, index, bool, father) {
      if (this.$attrs.pc && this.hasChildren(item) && father) {
        item.expand = bool
        /* 触发视图响应 */
        this.$set(this.arry, index, item)
      }
    },
    /* 收起其它下拉菜单 */
    resetExpandStatus(item) {
      this.arry.forEach(x => {
        if (x.id !== item.id) x.expand = false
      })
    },
    /* 收起所有下拉菜单 */
    unExpandAll() {
      this.arry.forEach((x, index) => {
        x.expand = false
        this.$set(this.arry, index, x)
      })
    },
    /* 导航到页面事件 */
    routerUrl(item) {
      this.$router.push({ path: item.url })
      if (this.$attrs.pc) this.unExpandAll()
      else this.$emit('trigger')
    },
    /* 设置array更新视图 PC添加点击空白关闭菜单事件 */
    setArray(item, index) {
      item.expand = !item.expand
      /* 触发视图响应 */
      this.$set(this.arry, index, item)

      // if (this.$attrs.pc) item.expand ? this.show() : this.hide()
    },
    hasChildren(item) {
      return item.children.length > 0
    }
  }
}
</script>
<style lang="less">
</style>
