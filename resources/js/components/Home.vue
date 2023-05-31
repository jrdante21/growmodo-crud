<template>
    <div class="relative">
        <Loader v-if="loading"/>
        <div class="flex flex-col md:flex-row gap-5 justify-between py-4 items-center">
            <div class="flex-1">Welcome, {{ user?.username }}</div>

            <div class="flex gap-3 items-center">
                <!-- Admin Button  -->
                <div v-if="isAdmin"><a href="javascript:void(0)" @click="getUsers()" class="button" :disabled="loading">View Records</a></div>

                <!-- Guest Button  -->
                <div v-else><a href="javascript:void(0)" @click="unsubsribe()" class="button" :disabled="loading">Unsubsribe</a></div>

                <div><a href="javascript:void(0)" @click="logout" class="button button-red" :disabled="loading">Logout</a></div>
            </div>
        </div>

        <div class="py-5">
            <!-- Admin -->
            <div v-if="isAdmin">
                <div v-if="recordsLoaded">
                    <!-- Users Records -->
                    <table v-if="records.length >= 1" class="text-sm table">
                        <thead class="hidden md:table-header-group">
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Dates</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(record, n) in records" :key="n">
                                <td>
                                    <strong class="text-xl md:text-base">{{ record.username }}</strong>
                                    <div class="mt-2 md:hidden">
                                        <table>
                                            <tr>
                                                <td class="font-bold text-gray-500 w-1/2">Email</td>
                                                <td class="w-1/2">{{ record.email }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-bold text-gray-500">Phone Number</td>
                                                <td>{{ record.phone_number }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-bold text-gray-500">Registered Date</td>
                                                <td>{{ record.registered_at }}</td>
                                            </tr>
                                            <tr v-if="record.deleted_at">
                                                <td class="font-bold text-gray-500">Unsubscribed Date</td>
                                                <td>{{ record.unsubscribed_at }}</td>
                                            </tr>
                                            <tr>
                                                <td class="font-bold text-gray-500">Status</td>
                                                <td>
                                                    <span v-if="record.deleted_at" class="badge">Unsubscribed</span>
                                                    <span v-else class="badge badge-green">Subscribed</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                                <td class="hidden md:table-cell">{{ record.email }}</td>
                                <td class="hidden md:table-cell">{{ record.phone_number }}</td>
                                <td class="hidden md:table-cell">
                                    <p><b class="text-gray-500">Registered:</b> {{ record.registered_at }}</p>
                                    <p v-if="record.deleted_at"><b class="text-gray-500">Unsubscribed:</b> {{ record.unsubscribed_at }}</p>
                                </td>
                                <td class="hidden md:table-cell">
                                    <span v-if="record.deleted_at" class="badge">Unsubscribed</span>
                                    <span v-else class="badge badge-green">Subscribed</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="text-center">
                        No records found.
                    </div>

                </div>
                <div v-else class="text-center">
                    <h1 class="text-xl font-bold">Welcome, {{ user?.username }}</h1>
                </div>
            </div>

            <!-- Guest -->
            <div v-else class="text-center">
                <h1 class="text-xl font-bold">Welcome, {{ user?.username }}</h1>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex"
import Loader from '@/js/utils/Loader.vue'
export default {
    data() {
        return {
            records: [],
            recordsLoaded: false,
            loading: false
        }
    },
    components: { Loader },
    methods:{
        ...mapActions({
            signout: 'auth/logout'
        }),
        async logout() {
            await axios.get('/api/logout')
            this.signout()
            this.$router.push({name:"login"})
        },

        // Admin Methods
        async getUsers() {
            if (!this.isAdmin) return false
            this.loading = true

            await axios.get('/sanctum/csrf-cookie')
            try {
                const {data} = await axios.get('/api/users')
                this.records = data

            } catch (error) {
                console.log(error.response)
            }

            this.loading = false
            this.recordsLoaded = true
        },

        // Guest Methods
        async unsubsribe() {
            if (!confirm("Are you sure you want to unsubscribe? You'll be logged out on this account.")) return
            this.loading = true

            try {
                await axios.get('/api/unsubscribe')
                alert("You're unsubscribed successfully. You've been logged out.")
                this.signout()
                this.$router.push({name:"login"})

            } catch (error) {
                console.log(error.response)
            }
            this.loading = false
        }
    } ,
    computed: {
        ...mapState({
            user: state => state.auth.user 
        }),
        ...mapGetters({
            isAdmin: 'auth/isAdmin' 
        })
    }
}
</script>