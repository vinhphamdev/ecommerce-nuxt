<template lang="html">
    <div class="ps-document">
        <h5>{{product.name}}</h5>
        <p>
            {{product.description}}
        </p>
    </div>
</template>

<script>
export default {
    name: 'PartialDescription',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped></style>
