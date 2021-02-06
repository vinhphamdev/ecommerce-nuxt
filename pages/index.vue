<template lang="html">
    <main id="homepage-1">
        <!-- <home-banner /> -->

        <div v-html="infoHTML"/>

        <!-- <clothings />

        <conumer-electronics/>

        <newsletters layout="fullwidth"/> -->
    </main>
</template>
<script>
import { mapState } from 'vuex';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import Newsletters from '~/components/partials/commons/Newsletters';
import SiteFeauturesFullwidth from '~/components/partials/commons/SiteFeauturesFullwidth';
import Clothings from '~/components/partials/homepage/default/Clothings';
import ConumerElectronics from '~/components/partials/homepage/default/ConumerElectronics';
import HomeBanner from '~/components/partials/homepage/default/HomeBanner';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/mobile/NavigationList';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import DemoPanel from '~/components/shared/DemoPanel';
import MarkdownIt from 'markdown-it';


export default {
    components: {
        DemoPanel,
        MobileDrawer,
        HeaderMobile,
        NavigationList,
        HeaderDefault,
        HomeBanner,
        SiteFeauturesFullwidth,
        FooterFullwidth,
        Newsletters,
        Clothings,
        ConumerElectronics,
    },
    data() {
        return {
           infoHTML: '',
        }
    },
    async created () {
        const data = await this.$store.dispatch('shop/getLandingPage');
        const md = new MarkdownIt();
        this.infoHTML = md.render(data[0].content);
    },

    transition: 'zoom',
    layout: 'layout-default',
};
</script>
