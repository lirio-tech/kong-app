<template>
    <v-text-field
        autocomplete="off"
        label="Username"
        prepend-icon="mdi-account"
        required filled
        v-model="username"
        :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
        @blur="username = username.toLowerCase()"
        @keyup="$emit('remove-special-char', username)"
    />    
</template>
<script>

export default {
    props:['username']
}
</script>