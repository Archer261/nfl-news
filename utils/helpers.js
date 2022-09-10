module.exports = {
  format_profile_url: (email) => {
    const url = "\"location.href='/profile/" + email + "'\"";
    console.log(url);
    return url;
  },

  format_espn_articles: (url) => {
    return "https://www.espn.com/nfl/story" + url;
  },
};
