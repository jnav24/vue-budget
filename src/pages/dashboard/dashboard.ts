import { Component, Vue } from 'vue-property-decorator';
import { MenuInterface } from '@/interfaces/menu.interface';
import LoginDialog from '@/components/dashboard/dialogs/login-dialog/LoginDialog.vue';
import MainNavDesktop from '@/components/dashboard/menu/main-nav-desktop/MainNavDesktop.vue';
import MainNavMobile from '@/components/dashboard/menu/main-nav-mobile/MainNavMobile.vue';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';

@Component({
    components: {
        LoginDialog,
        MainNavDesktop,
        MainNavMobile,
    },
})
class Dashboard extends Vue {
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    public menu: MenuInterface[] = [
        {
            name: 'Dashboard',
            link: { name: 'dashboard' },
        },
        {
            name: 'Budget',
            link: { name: 'budget-list' },
        },
    ];
    public mobileMenu: boolean = false;

    public get showLogin() {
        return this.userState.login.timeout;
    }

    public goToProfile() {
        this.$router.push({ name: 'profile' });
    }

    public logout() {
        this.$store
            .dispatch('logUserOut')
            .then((res: { success: boolean }) => {
                if (res.success) {
                    this.$router.push({ name: 'login' });
                }
            });
    }

    public updateMenu(menu: boolean) {
        this.mobileMenu = menu;
    }
}

export default Dashboard;
