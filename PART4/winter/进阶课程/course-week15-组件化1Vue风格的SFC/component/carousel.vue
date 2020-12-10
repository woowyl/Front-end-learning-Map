<template>
    <div>
        <img />
    </div>
</template>


<script>
export default {
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
        // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    }
}

</script>