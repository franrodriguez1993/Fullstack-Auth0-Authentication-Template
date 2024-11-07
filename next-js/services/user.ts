export const getUserInfo = async () => {
  
    const response = await fetch(`/api/users/me`, {
      method: 'POST',
    });
  
  if (!response.ok) {
    throw new Error("Error")
  };
  return await response.json()

}

export const profileAccessToken = async () => {
  const tokenRes = await fetch('/api/access-token');
  const { accessToken } = await tokenRes.json();
  console.log(accessToken);
    
}
