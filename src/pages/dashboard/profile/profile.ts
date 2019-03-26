import { Component, Vue } from 'vue-property-decorator';
import UserProfile from '@/components/dashboard/profile/user-profile/UserProfile.vue';

@Component({
    components: {
        UserProfile,
    },
})
class Profile extends Vue {}

export default Profile;
