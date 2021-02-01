<template lang="html">
    <div class="ps-product__desc">
        <p>
            Sold By:
            <nuxt-link to="/shop">
                <strong> {{ product.vendor.name }}</strong>
            </nuxt-link>
        </p>
        <div v-html="infoHTML"/>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
export default {
    name: 'ModuleProductDetailDesc',
    props: {
        product: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            infoHTML: '',
        };
    },
    created() {
        const md = new MarkdownIt();
        this.infoHTML = this.product.info ? md.render(this.product.info) : '';
    },
};
</script>

<style lang="scss" scoped></style>
