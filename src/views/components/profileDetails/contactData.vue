<script setup>

const props = defineProps(
    ['profile'],
);
</script>

<template>

        <div class="w-100">
                 <span v-if=" profile.is_professional ==0">
                    <span class="font-weight-bold">Company:&nbsp;</span>
                    {{ profile.user.company }}&nbsp;&nbsp;
                 </span>
            <span v-if=" profile.is_professional ==0" class="font-weight-bold">
                    Contact person:
              </span>
            {{ profile.user.name }}
            {{ profile.user.familyName }}
        </div>


        <div class="float-left">
            <span class="bi-telephone">&nbsp;{{ profile.user.tel }}</span>&nbsp;
            <span class="bi-envelope-fill">&nbsp;{{ profile.user.tel }}</span><br>
        </div>
        <div class="float-left ml-2">
            {{ profile.user.street }}&nbsp; {{ profile.user.houseNumber }},&nbsp;
            {{ profile.user.postalCode }}&nbsp; {{ profile.user.city }}
        </div>


</template>
