import { Component, Vue } from 'vue-property-decorator';
import UserProfile from '@/components/dashboard/profile/user-profile/UserProfile.vue';
import UserSecurity from '@/components/dashboard/profile/user-security/UserSecurity.vue';

@Component({
    components: {
        UserProfile,
        UserSecurity,
    },
})
class Profile extends Vue {}

export default Profile;
