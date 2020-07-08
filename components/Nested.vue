<template>
  <ul :class="[children.length>1?'border-left':'']">
    <li v-for="element in children" :key="element.id">
      <div v-if="parentId!==0" class="o-line-up"></div>
      <a>
        <span>{{ `${element.displayName}` }}</span>
      </a>
      <div v-if="element.children.length>0" class="o-line-down"></div>
      <nested-draggable
        v-if="element.children.length>0"
        :children="element.children"
        :parent-id="element.id"
        :current-layer="getCurrentLayer"
      />
      <div class="clear"></div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'NestedDraggable',
  data() {
    return {}
  },
  props: {
    children: {
      required: true,
      type: Array
    },
    parentId: {
      type: Number,
      default: 0
    },
    currentLayer: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getCurrentLayer() {
      return this.currentLayer + 1
    }
  },
  methods: {}
}
</script>
<style lang='less' scoped>
.border-left {
  border-left: 1px solid #dee2e6 !important;
}
</style>
