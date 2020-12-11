<template>
	<view class="continer">
        <view>
            <uni-calendar 
            :insert="true"
            :lunar="true" 
            :start-date="'2019-3-2'"
            :end-date="'2019-5-20'"
            :showMonth="true"
            :selected="selected"
            @change="change"
            ></uni-calendar>
        </view>
    </view>
</template>

<script>
	
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
export default {
    components: {
        uniCalendar
    },
    data() {
        return {
            selected:[{date: '2020-12-12', info: '签到'}]
        };
    },
    methods: {
        change(e) {
            console.log(e);
        }
    }
}
</script>

<style>
	
</style>