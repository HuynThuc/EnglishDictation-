import React, { createContext, useState, useEffect, useContext } from 'react';
import requestApi from '../helpers/api';

// Tạo AuthContext
export const AuthContext = createContext();

// Hàm lưu token vào sessionStorage
export const setTokens = (access_token, refresh_token) => {
    sessionStorage.setItem('AccessToken', access_token);
    sessionStorage.setItem('RefreshToken', refresh_token);
};

// Hàm lấy token từ sessionStorage
export const fetchAccessToken = () => sessionStorage.getItem('AccessToken');
export const fetchRefreshToken = () => sessionStorage.getItem('RefreshToken');

// Hàm xóa token khỏi sessionStorage khi đăng xuất
export const clearTokens = () => {
    sessionStorage.removeItem('AccessToken');
    sessionStorage.removeItem('RefreshToken');
};

// Hàm giải mã token
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Hook sử dụng AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     // Thêm hàm để lấy token từ URL
     const getTokenFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            // Xóa token khỏi URL để bảo mật
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        return token;
    };


    const handleGoogleLoginSuccess = async () => {
        try {
            // Thứ tự ưu tiên: 
            // 1. Token từ URL (khi mới đăng nhập)
            // 2. Token từ localStorage (nếu đã lưu trước đó)
            const urlToken = getTokenFromUrl();
            const storedToken = fetchAccessToken();
            const token = urlToken || storedToken;

            if (token) {
                const decodedUser = decodeToken(token);
                if (decodedUser) {
                    // Nếu là token mới từ URL, lưu vào localStorage
                    if (urlToken) {
                        setTokens(urlToken, ''); // Không có refresh token trong trường hợp Google login
                    }
                    setUser(decodedUser);
                    console.log("User logged in:", decodedUser);
                }
            }
        } catch (error) {
            console.error('Google login error:', error);
            clearTokens();
        } finally {
            setLoading(false);
        }
    };


    const login = async (email, password) => {
        const loginData = { email, password }; // Dữ liệu đăng nhập
        try {
            const res = await requestApi('/auth/login', 'POST', loginData);
            if (res.data.access_token && res.data.refresh_token) {
                const { access_token, refresh_token } = res.data;
                setTokens(access_token, refresh_token);
    
                const user = decodeToken(access_token);
                setUser(user);
            } else {
                // Nếu không có token, ném lỗi
                return { success: false, message: 'Login failed: no tokens returned' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Email hoặc mật khẩu không chính xác' };
        }
     
        return { success: true }; // Trả về thành công nếu không có lỗi
    };

    const logout = () => {
        clearTokens();
        setUser(null);
    };


    useEffect(() => {
        handleGoogleLoginSuccess();
    }, []);

    useEffect(() => {
        const access_token = fetchAccessToken();
        if (access_token) {
            const user = decodeToken(access_token);
            setUser(user);
        } else {
            setUser(null); // Nếu không có token thì set user null
        }
    }, []);

    const updateUserInfo = (newUserInfo) => {
        setUser(newUserInfo);
      };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, handleGoogleLoginSuccess,updateUserInfo , loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
