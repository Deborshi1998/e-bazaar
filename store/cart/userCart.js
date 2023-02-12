import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../utils/firebaseSetup";

const initialState = {
  cart: [],
  loading: false,
  error: null,
  order: [],
};

export const fetchProducts = createAsyncThunk(
  "userCart/fetchProducts",
  async (userToken) => {
    const document = doc(db, "users", userToken.uid);
    const docSnap = await getDoc(document, userToken);
    const data = docSnap.data();
    console.log("data", data);
    if (data.cart.length > 0) {
      return data.cart;
    } else {
      return [];
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "userCart/fetchOrders",
  async (userToken) => {
    const q = query(
      collection(db, "orders"),
      where("user", "==", userToken.uid)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  }
);

export const addToCartFirebase = createAsyncThunk(
  "userCart/addToCartFirebase",
  async (payload) => {
    const { id, fullproduct, token } = payload;
    const userToken = JSON.parse(token);
    console.log(userToken.user);
    const docRef = doc(db, "users", userToken.uid);
    const docSnap = await getDoc(docRef, userToken);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.cart.length === 0) {
        data.cart.push({
          id: fullproduct.id,
          name: fullproduct.product_name,
          price: fullproduct.price,
          imageSrc: fullproduct.image,
          quantity: 1,
        });
      } else {
        let item = data.cart.find((item) => item.id === id);
        if (item) {
          item.quantity++;
        } else {
          data.cart.push({
            id: fullproduct.id,
            name: fullproduct.product_name,
            price: fullproduct.price,
            imageSrc: fullproduct.image,
            quantity: 1,
          });
        }
      }
      await updateDoc(
        docRef,
        {
          cart: data.cart,
        },
        {
          auth: userToken,
        }
      );
      return data.cart;
    } else {
      throw new Error("No such document!");
    }
  }
);

export const removeFromCartFirebase = createAsyncThunk(
  "userCart/removeFromCartFirebase",
  async (payload) => {
    const { id, token } = payload;
    const userToken = JSON.parse(token);

    const docRef = doc(db, "users", userToken.uid);
    const docSnap = await getDoc(docRef, userToken);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.cart.length === 0) {
        throw new Error("Cart is empty!");
      } else {
        let item = data.cart.find((item) => item.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            data.cart = data.cart.filter((item) => item.id !== id);
          }
        } else {
          throw new Error("Item not found!");
        }
      }
      await updateDoc(
        docRef,
        {
          cart: data.cart,
        },
        {
          auth: userToken,
        }
      );
      return data.cart;
    } else {
      throw new Error("No such document!");
    }
  }
);

export const checkoutCartFirebase = createAsyncThunk(
  "userCart/checkoutCartFirebase",
  async (payload) => {
    const { cart, token } = payload;
    const userToken = JSON.parse(token);

    const colRef = collection(db, "orders");
    const orderId = await addDoc(
      colRef,
      {
        bucket: cart,
        user: userToken.uid,
        date: serverTimestamp(),
      },
      {
        auth: userToken,
      }
    );
    console.log(orderId.id);

    const userDoc = doc(db, "users", userToken.uid);
    const userDocSnap = await getDoc(userDoc, userToken);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      console.log(data);
      data.order.push(orderId.id);
      try {
        await updateDoc(
          userDoc,
          {
            cart: [],
            order: data.order,
          },
          {
            auth: userToken,
          }
        );
      } catch (err) {
        console.log(err);
      }

      return data.cart;
    } else {
      throw new Error("No such document!");
    }
  }
);

const userCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    buyProduct: (state, action) => {
      state.order.push(...state.cart);
      state.cart = [];
    },
    addToCart: (state, action) => {
      if (state.cart.length === 0) {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.product_name,
          price: action.payload.price,
          imageSrc: action.payload.image,
          quantity: 1,
        });
      } else {
        let item = state.cart.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity++;
        } else {
          state.cart.push({
            id: action.payload.id,
            name: action.payload.product_name,
            price: action.payload.price,
            imageSrc: action.payload.image,
            quantity: 1,
          });
        }
      }
    },
    removeFromCart: (state, action) => {
      if (state.cart.length === 0) return;
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity--;
      } else if (item.quantity === 1) {
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart.splice(index, 1);
      }
    },
  },
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.loading = false;
      const ordersArray = [];
      state.order = action.payload.forEach((element) => {
        ordersArray.push(...element.bucket);
      });
      state.order = ordersArray;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addToCartFirebase.pending]: (state, action) => {
      state.loading = true;
    },
    [addToCartFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    [addToCartFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [removeFromCartFirebase.pending]: (state, action) => {
      state.loading = true;
    },
    [removeFromCartFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    [removeFromCartFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [checkoutCartFirebase.pending]: (state, action) => {
      state.loading = true;
    },
    [checkoutCartFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = [];
      state.order.unshift(...action.payload);
    },
    [checkoutCartFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { addToCart, removeFromCart, buyProduct } = userCartSlice.actions;
export const selectUserCartLoading = (state) => state.userCart.loading;
export const selectUserCartError = (state) => state.userCart.error;
export const selectUserCart = (state) => state.userCart.cart;
export const selectUserOrder = (state) => state.userCart.order;
export const selectUserCartTotal = (state) =>
  state.userCart.cart.reduce((total, item) => total + item.quantity, 0);
export const selectUserCartTotalPrice = (state) =>
  state.userCart.cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
export default userCartSlice.reducer;
