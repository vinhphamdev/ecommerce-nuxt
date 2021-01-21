<template lang="html">
    <div>
        <h1>{{ product.name }}</h1>
        <div class="ps-product__meta">
            <p>
                Brand:
                <nuxt-link to="/shop">
                    <a class="ml-2 text-capitalize">
                        {{ product.vendor.name }}
                    </a>
                </nuxt-link>
            </p>
        </div>
        <h4 class="ps-product__price">
            ${{ product.price.toFixed(2) }}
        </h4>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductInfo',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped></style>
