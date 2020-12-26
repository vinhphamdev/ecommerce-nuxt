<template lang="pug">
    .ps-product--quickview
        .ps-product__thumbnail
            .ps-product__gallery
                .ps-carousel(v-swiper:mySwiper="swiperOption")
                    .swiper-wrapper
                        .swiper-slide: img(src="http://dummyimage.com/1000x1000.jpg/dddddd/000000")
                        .swiper-slide: img(src="http://dummyimage.com/1000x1000.jpg/F2B705/ffffff")
                        .swiper-slide: img(src="http://dummyimage.com/1000x1000.jpg/4A148C/ffffff")
        .ps-product__content
            h4.ps-product__title {{ product.name }}
            p(v-if="product.on_sale").ps-product__price.sale
                del $ {{ product.sale_price }}
                | $ {{ product.sale_price }}
            p(v-else).ps-product__price {{ product.price }}
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    data: () => {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 100,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                }
            }
        };
    }
};
</script>
