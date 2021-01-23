<template lang="html">
    <div class="ps-block--vendor">
        <div class="ps-block__thumbnail">
            <img v-if="vendor.avatar" :src="vendor.avatar.url" alt="martfury" />
        </div>
        <div class="ps-block__container">
            <div class="ps-block__header">
                <h4>{{vendor.name}}</h4>
            </div>
            <div class="ps-block__divider"></div>
            <div class="ps-block__content">
                <p>
                   {{vendor.description}}
                </p>
                <span class="ps-block__divider"></span>
                <p>
                    <strong>Address</strong> 325 Orchard Str, New York, NY 10002
                </p>
                <figure>
                    <figcaption>
                        Foloow us on social
                    </figcaption>
                    <ul class="ps-list--social-color">
                        <li>
                            <a class="facebook" href="#">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a class="twitter" href="#">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a class="linkedin" href="#">
                                <i class="fa fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a class="feed" href="#">
                                <i class="fa fa-feed"></i>
                            </a>
                        </li>
                    </ul>
                </figure>
            </div>
            <div class="ps-block__footer">
                <p>
                    Call us directly
                    <strong>(+053) 77-637-3300</strong>
                </p>
                <p>or Or if you have any question</p>
                <a class="ps-btn ps-btn--fullwidth" href="">
                    Contact Seller
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VendorProfile',
    computed: {
        vendor() {
            return this.$store.state.shop.vendor;
        },
    },
};
</script>

<style lang="scss" scoped></style>
