<template>
  <div :class="['navbar',sub?'sub':'',expand?'expand':'']">
    <ul>
      <li v-for="item in arry" :key="item.id">
        <a class="nav-link white">
          <span
            v-if="hasChildren(item)"
            :class="['expand-icon',item.expand?'expand':'']"
            @click="item.expand=!item.expand"
          >
           <i class="fas fa-caret-right"></i>
          </span>
          <span>{{ item.displayName }}</span>
        </a>
        <navbar
          v-if="hasChildren(item)"
          :items="item.children"
          :expand="item.expand"
          :sub="true"
        ></navbar>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isExpand: false
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    sub: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    arry() {
      return this.items.map(x => {
        x.expand = false
        return x
      })
    }
  },
  methods: {
    open() {
      console.log(this.items)
    },
    hasChildren(item) {
      return item.children.length > 0
    },
    openSub() {
      this.isExpand = !this.isExpand
      console.log('opensub' + this.items)
    }
  }
}
</script>
<style lang="less">
</style>
