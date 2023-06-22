import { defineStore } from 'pinia'
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    users:JSON.parse(localStorage.getItem('users')),
    user:JSON.parse(localStorage.getItem('user')),
    errorMessage:'',
    errorMessageAlert:false,
  }),
  actions: {
    register(userData){
      this.errorMessage = ''
      this.errorMessageAlert = false
      const existingUsers = localStorage.getItem('users');
      let users = [];
      if (existingUsers) {
        users = JSON.parse(existingUsers);
      }
      const findUserByEmail = (email) => {
        return users.find((user) => user.email === email);
      };
      
      // Usage
      const userEmail = userData.email;
      const foundUser = findUserByEmail(userEmail);
      if(foundUser){
        this.errorMessage = 'This email is already taken.'
        this.errorMessageAlert = true
      }else{
        const id = users.length + 1;
        const newUser = {
          id: id,
          ...userData
        };
        users.push(newUser);
        const updatedUsers = JSON.stringify(users);
        localStorage.setItem('users', updatedUsers);
        this.users = users;
        router.push('/login');
      }
      
    },
    login(email, password,  ) {
      this.errorMessage = ''
      this.errorMessageAlert = false
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const findUserByEmail = (email) => {
        return users.find((user) => user.email === email);
      };
      
      const userEmail = email;
      const foundUser = findUserByEmail(userEmail);
      
      if (foundUser) {
        if(foundUser.email == email && foundUser.password == password){
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(foundUser))
          this.isLoggedIn = true
          localStorage.setItem('isLoggedIn', true)
          this.user = foundUser
        }else{
          this.errorMessage = 'Invalid credentials'
          this.errorMessageAlert = true
        }
      } else {
        this.errorMessage = 'User not found'
        this.errorMessageAlert = true
      }
    },
    logout() {
      localStorage.removeItem('user')
      this.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
    },
   
  },
})

