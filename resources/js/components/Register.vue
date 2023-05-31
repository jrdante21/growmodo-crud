<template>
    <div style="max-width: 500px;" class="card mx-auto mt-5 relative">
        <Loader v-if="loading"/>
        <h1 class="text-xl text-center">Register</h1>
        <form v-if="!success" @submit.prevent="submitForm()" class="flex flex-col gap-5">
            <div>
                <label>Username</label>
                <input type="text" name="username" :class="{error: errors.username}" v-model="auth.username" required>
                <div v-if="errors.username" class="card card-red mt-3">
                    <p v-for="(error, n) in errors.username" :key="n">{{ error }}</p>
                </div>
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="email" :class="{error: errors.email}" v-model="auth.email" required>
                <div v-if="errors.email" class="card card-red mt-3">
                    <p v-for="(error, n) in errors.email" :key="n">{{ error }}</p>
                </div>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="text" name="phone_number" :class="{error: errors.phone_number}" v-model="auth.phone_number" required>
                <div v-if="errors.phone_number" class="card card-red mt-3">
                    <p v-for="(error, n) in errors.phone_number" :key="n">{{ error }}</p>
                </div>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" :class="{error: errors.password}" v-model="auth.password" required>
                <div v-if="errors.password" class="card card-red mt-3">
                    <p v-for="(error, n) in errors.password" :key="n">{{ error }}</p>
                </div>
            </div>
            <div>
                <label for="password">Confirm Password</label>
                <input type="password" name="password_confirmation" v-model="auth.password_confirmation" required>
            </div>
            <div>
                <button :disabled="loading" class="button button-green w-full">Submit</button>
            </div>
            <div class="text-center">
                Have an account? <router-link to="/" class="underline">Login here</router-link>.
            </div>
        </form>

        <div v-else class="card card-green text-center">
            <h2>You are successfully registered.</h2>
            <p>Please <router-link to="/" class="underline">login here</router-link>.</p>
        </div>
    </div>
</template>
<script>
import Loader from '@/js/utils/Loader.vue'
export default {
    data() {
        return {
            auth: {
                username: '',
                email: '',
                phone_number: '',
                password: '',
                password_confirmation: '',
            },
            loading: false,
            errors: {},
            success: false
        }
    },
    components: { Loader },
    methods: {
        async submitForm() {
            this.loading = true
            try {
                await axios.post('/api/register', this.auth);
                this.success = true
                this.errors = {}
                
            } catch ({response}) {
                console.log(response)
                this.errors = response.data?.errors
            }
            this.loading = false
        },
    }
}
</script>