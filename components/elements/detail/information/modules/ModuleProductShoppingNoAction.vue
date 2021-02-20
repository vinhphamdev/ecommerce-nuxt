<template lang="html">
    <div class="ps-product__shopping">
        <figure>
            <figcaption>Quantity</figcaption>
            <div class="form-group--number">
                <button class="up">
                    <i class="fa fa-plus"></i>
                </button>
                <button class="down">
                    <i class="fa fa-minus"></i>
                </button>
                <input class="form-control" type="text" disabled />
            </div>
        </figure>
        <a class="ps-btn ps-btn--black" href="#">
            Add to cart
        </a>
        <a class="ps-btn" href="#">
            Buy Now
        </a>
        <div class="ps-product__actions">
            <button >
                <i class="icon-heart"></i>
            </button>
            <button>
                <i class="icon-chart-bars"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductShoppingNoAction'
};
</script>

<style lang="scss" scoped></style>
