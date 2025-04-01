import { connect } from '@/dbConfig/dbConfig'; 
import Users from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { user, interest, age, mobile, email } = reqBody;

        if(user.trim() === '' || email === ''){
            return NextResponse.json({message:"Validation error. Please give User and Email"})
        }

        const existingUser = await Users.findOne({ user });
        if (existingUser) {
            return NextResponse.json({ message: "User already present" }, { status: 400 });
        }

        const newUser = new Users({ user, interest, age, mobile, email });
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User saved successfully",
            success: true,
            savedUser
        });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        let user;

        if (id) {
            user = await Users.findOne({ _id: id });
        } else {
            user = await Users.find();
        }

        return NextResponse.json({ message: "User found", status: 200, user });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest){
    try{
        const reqBody = await request.json();
        const { _id, user, interest, age, mobile, email } = reqBody;
        if(_id){
            const updateUser = await Users.findOneAndUpdate(
                { _id: _id },
                { user, interest, age, mobile, email },
                { new: true } 
              );
            if(updateUser){
                return NextResponse.json({message:"Update Successfully", status: 200, updateUser})
            } else {
                return NextResponse.json({message: "User not found", status:400})
            }
        } else {
            return NextResponse.json({message: "User not found", status:400})
        }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}