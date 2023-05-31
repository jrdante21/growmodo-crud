<template>
    <div style="max-width: 500px;" class="card mx-auto mt-5 relative">
        <Loader v-if="loading"/>
        <h1 class="text-xl text-center">Login</h1>
        <div>
            <form @submit.prevent="submitForm()" class="flex flex-col gap-5">
                <div>
                    <label for="username">Username / Email</label>
                    <input type="text" name="username" v-model="auth.username" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="auth.password" required>
                </div>
                <div>
                    <button :disabled="loading" class="button button-green w-full">Login</button>
                </div>
                <div class="text-center">
                    No account? <router-link to="/register" class="underline">Register here</router-link>.
                </div>
                <div v-if="error" class="card card-red">
                    Incorrect username or password.
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import Loader from '@/js/utils/Loader.vue'
export default {
    data() {
        return {
            auth: {
                username: '',
                password: '',
            },
            loading: false,
            error: false
        }
    },
    components: { Loader },
    methods: {
        async submitForm() {
            this.loading = true
            await axios.get('/sanctum/csrf-cookie')

            try {
                await axios.post('/api/login', this.auth);
                this.login()
                
            } catch ({response}) {
                console.log(response)
                this.error = true
            }

            this.loading = false
        },
        ...mapActions({
            login:'auth/login'
        })
    }
}
</script>