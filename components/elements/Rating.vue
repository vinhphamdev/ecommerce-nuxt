<template lang="html">
    <span class="ps-rating">
        <i v-for='(checkedStar, index) in rating' :key='index' class="fa fa-star"></i>
        <i v-for='(uncheckedStar, index) in starsUnchecked' :key='index' class="fa fa-star-o"></i>
    </span>
</template>

<script>
export default {
    name: 'Rating',
	props: {
		rating: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			maxRating: 5
		}
	},
	computed: {
		starsUnchecked() {
			return this.maxRating - this.rating
		}
	}
};
</script>

<style lang="scss" scoped></style>
