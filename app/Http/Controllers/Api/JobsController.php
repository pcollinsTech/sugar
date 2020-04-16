<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\JobRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Carbon\Carbon;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
       
        return Job::loadAllMine($request->user()->id);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param JobRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(JobRequest $request)
    {
        $user = $request->user();

        $job = new Job($request->validated());
        

        $user->jobs()->save($job);

        return response()->json($job, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return Job::mine($request->user()->id)->findOrFail($id);
        }

        return Job::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param JobRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(JobRequest $request, $id)
    {
        $job = Job::findOrFail($id);

        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $job->update($data);

        return response()->json($job, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $job = Job::findOrFail($id);

        $job->delete();

        return response([], 200);
    }
}
