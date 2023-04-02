using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ScriptPosition : MonoBehaviour
{
    public float SpeedX = 1f;
    public float SpeedY = 5f;
    public float SpeedZ = 2f;

    private Vector3 _startPosition;

    void Start()
    {
        _startPosition = transform.position;
    }

    void Update()
    {
        _startPosition.x += Time.deltaTime * SpeedX;
        _startPosition.y += Time.deltaTime * SpeedY;
        _startPosition.z += Time.deltaTime * SpeedZ;
        
        transform.position = new Vector3(_startPosition.x, _startPosition.y, _startPosition.z);
    }
}
