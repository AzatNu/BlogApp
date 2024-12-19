export const sessions = {
    list: {},
    create(user) {
        const hash = Math.random().toString(30);
        this.list[hash] = user;
        return hash;
    },
    remove(hash) {
        delete this.list[hash];
    },
    checkAccess(hash, accessRoles) {
        const user = this.list[hash];
        return !!user && accessRoles.includes(user.role_id);
    },
};
