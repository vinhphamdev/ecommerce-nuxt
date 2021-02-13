export default function({ store, redirect }) {
    if (!process.server) {
        if (!store.state.auth.isLoggedIn) {
            return redirect('/account/login');
        }
    }
}
