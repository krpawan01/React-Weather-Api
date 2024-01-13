import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "f3a3033297328ad0b7691010c6ad385f"
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

export const weaterApi = createAsyncThunk('weather', async (payload) => {
    try {
        const api = await axios(apiUrl + payload +`&appid=${apiKey}`)
        return api.data;
    } catch (err) {
        console.log('error on api ', err)
    }
})

const initialState = {
    data: null,
    error: false,
    isLoding: false
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(weaterApi.pending, (state, action) => {
            state.isLoding = true;
        })
        builder.addCase(weaterApi.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(weaterApi.rejected, (state, action) => {
            console.log(state.error)
            state.error = true;
        })
    }
})

export const weaterReducer = weatherSlice.reducer;
export const weatherSelecter= (state) => state.weaterReducer;