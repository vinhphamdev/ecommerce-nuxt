<template lang="pug">
    ContentLoader(
        :height="500"
        :width="400"
        :speed="1"
        :animate="true"
        primaryColor="#ddd"
        secondaryColor="#f9f9f9"
    )
        rect(x="0" y="0" rx="0" ry="0" width="400" height="300")
        rect(x="0" y="310" rx="0" ry="0" width="70%" height="40")
        rect(x="0" y="370" rx="0" ry="0" width="100%" height="20")
        rect(x="0" y="410" rx="0" ry="0" width="100%" height="20")
        rect(x="0" y="450" rx="0" ry="0" width="30%" height="30")
</template>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
    components: {
        ContentLoader
    }
};
</script>
