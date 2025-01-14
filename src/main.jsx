
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx"
import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Login, Signup } from './components/index.js'
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AddPost from './pages/AddPost.jsx'
import ActiveInActivePosts from './pages/ActivInActivePosts.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        ),
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost/>
          </AuthLayout>
        ),
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts/>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
      },
      {
        path:"/allactiveinactive-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <ActiveInActivePosts/>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])
createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
    

)
