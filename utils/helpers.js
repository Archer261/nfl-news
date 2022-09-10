module.exports = {
    format_profile_url: (email) => {
        const url = '"location.href=\'/profile/' + email + '\'"';
        console.log(url);
        return url;
    },
};
