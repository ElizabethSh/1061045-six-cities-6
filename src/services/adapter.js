export const adaptOffersData = (data) => {
  const adaptedData = ({
    ...data,
    isFavorite: data.is_favorite,
    isPremium: data.is_premium,
    previewImage: data.preview_image,
    maxAdults: data.max_adults,
    host: {
      ...data.host,
      avatarUrl: data.host.avatar_url,
      isPro: data.host.is_pro
    }
  });

  delete adaptedData.is_favorite;
  delete adaptedData.is_premium;
  delete adaptedData.preview_image;
  delete adaptedData.max_adults;
  delete adaptedData.host.avatar_url;
  delete adaptedData.host.is_pro;

  return adaptedData;
};

export const adaptReviewsData = (data) => {
  const adaptedData = {
    ...data,
    user: {
      ...data.user,
      avatarUrl: data.user.avatar_url,
      isPro: data.user.is_pro
    }
  };

  delete adaptedData.user.avatar_url;
  delete adaptedData.user.is_pro;

  return adaptedData;
};
