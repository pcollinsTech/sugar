<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    // use soft delete instead of permanent delete

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'jobs';

    protected $fillable =['role','start_date', 'end_date', 'job_info'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['start_date', 'end_date'];


    /**
     * Load all for logged in user and paginate
     *
     * @param $user_id
     *
     * @return Paginator
     */
    public static function loadAllMine(int $user_id): Paginator
    {
        return static::latest()
            ->mine($user_id)
            ->paginate();
    }


    /**
     * Load only jobs related with the user id
     *
     * @param Builder $query
     * @param int $user_id
     *
     * @return Builder
     */
    public function scopeMine(Builder $query, int $user_id): Builder
    {
        return $query->where('user_id', $user_id);
    }

    /**
     * Relationship between jobs and user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
